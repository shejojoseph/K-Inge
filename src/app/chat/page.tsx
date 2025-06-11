'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import type { Msg, PersonData } from '@/types'
import ReactMarkdown from 'react-markdown';


export default function ChatPage() {

  const params = useSearchParams();
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [history, setHistory] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [history]);

  const dataParam = params.get('data') || '';
  let personA: PersonData, personB: PersonData;
  try {
    ({ personA, personB } = JSON.parse(decodeURIComponent(dataParam)));
    console.log('✅ Parsed couple: ', personA, personB);
  } catch {
    return (
      <div className='p-8 text-red-600'>
        <p>
          Invalid couple data.
        </p>
        <button onClick={() => router.push('/enter')} className='underline'>Go back</button>.
      </div>
    )
  }

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setError(null);

    const userMsg: Msg = { role: 'user', content: input };
    const newHistory = [...history, userMsg];
    setHistory(newHistory);
    setInput('');
    setLoading(true);

    let res: Response;
    try {
      res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personA,
          personB,
          messages: newHistory,
        }),
      });
    } catch (Err) {
      setError(`Error encountered(network): ${Err}`);
      setLoading(false);
      return;
    }


    if (!res.ok) {
      const text = await res.text();
      setError(`Server Error: (${res.status}): ${text}`);
      setLoading(false);
      return;
    }

    try {
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let assistantMsg = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantMsg += decoder.decode(value);
        setHistory([...newHistory, { role: 'assistant', content: assistantMsg }]);
      }
    } catch (streamErr) {
      setError(`Error while reading response stream: ${streamErr}`)
    } finally {
      setLoading(false);
    }



  };

  return (
    <div className='flex flex-col min-h-screen bg-gray-50'>
      <div className='p-4 bg-white shadow'>
        <h1 className='text-xl font-bold'>
          Chat with Inge
        </h1>
      </div>
      {error && (
        <div className="bg-red-100 text-red-800 p-4">
          <p>{error}</p>
          <button
            onClick={() => setError(null)}
            className="underline mt-1"
          >
            Dismiss
          </button>
        </div>
      )}
      <div ref={scrollRef} className='flex-1 overflow-auto p-4 space-y-2'>
        {history.map((m, i) => (
          <div
            key={i}
            className={`max-w-2xl px-4 py-2 rounded-xl ${m.role === 'user'
              ? 'self-end bg-blue-100 text-blue-800'
              : 'self-start bg-gray-200 text-gray-800'
              }`}
          >
            <ReactMarkdown>
              {m.content}
            </ReactMarkdown>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className='sticky bottom-0 p-4 bg-white flex items-center space-x-2 border-t'>
        <textarea
          rows={3}
          className='flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
          placeholder='Type your message...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type='submit'
          disabled={loading}
          className='self-end px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-700'
        >
          {loading ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
}