"use client";

import { useState } from "react";

type Prompt = {
  prompt: string;
  recommended_model: string | null;
};

const CopyButton = ({ textToCopy }: { textToCopy: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className={`font-medium py-2 px-3 rounded-lg transition-all duration-200 flex items-center gap-2 ${
        copied
          ? "bg-green-500 text-white"
          : "bg-gray-200 hover:bg-gray-300 text-gray-600"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
      </svg>
      <span>{copied ? "Copied!" : "Copy"}</span>
    </button>
  );
};

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>("Image");
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [generatedPrompts, setGeneratedPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const options = {
    Image: ["Photorealistic"],
    Video: ["Cinematic Shot"],
    Text: ["Blog Post"], 
  };

  const handleGeneratePrompt = async () => {
    if (!selectedCategory || !selectedStyle) {
      setError("Please select a category and a style.");
      return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/generate-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: selectedCategory,
          style: selectedStyle
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again.")
      }

      const data: Prompt = await response.json();
      setGeneratedPrompts(prev => [data, ...prev]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="bg-gray-50 text-gray-800 antialiased min-h-screen">
        <div className="container mx-auto px-4 py-8 md:py-14 max-w-3xl">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text pb-1">
              Promptly
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Prompt generation tool for AI
            </p>
          </header>
          <div className="space-y-10">
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                <span className="bg-gray-200 text-gray-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">1</span>
                Select Category
              </h2>
                <div className="grid grid-cols-3 gap-4">
                  {Object.keys(options).map((category) => (
                    <button
                    className={`bg-white border rounded-lg p-4 text-center transition-all duration-200 focus:outline-none shadow-sm ${
                      selectedCategory === category
                        ? 'ring-2 ring-purple-500 border-purple-400'
                        : 'hover:border-purple-400 border-gray-200'
                    }`}
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setSelectedStyle(null);
                      }}
                      >
                        <span className="text-2xl mb-1">{category === 'Image' ? '🖼️' : category === 'Video' ? '🎬' : '✍️'}</span>
                        <span className="block font-medium">{category}</span>
                    </button>
                  ))}
                </div>
            </section>
            {selectedCategory && (
              <section>
                <h2 className="text-xl font-semibold mb-6 text-gray-700">
                  <span className="bg-gray-200 text-gray-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">2</span>
                  Choose Style
                </h2>

                <div className="flex flex-wrap gap-3">
                  {options[selectedCategory as keyof typeof options].map((style) => (
                    <button 
                    className={`font-medium py-2 px-4 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                        selectedStyle === style
                          ? 'bg-purple-500 text-white'
                          : 'bg-white hover:bg-purple-100 border border-gray-200 text-gray-700'
                      }`}
                      key={style}
                      onClick={() => setSelectedStyle(style)}
                      >
                        {style}
                    </button>
                  ))}
                </div>
              </section>
            )}
            <section className="text-center">
              <button
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-10 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                onClick={handleGeneratePrompt}
                disabled={isLoading || !selectedCategory || !selectedStyle}
              >
                {isLoading ? "Generating..." : "Generate"}
              </button>
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </section>
            {generatedPrompts.length > 0 && (
              <section className="pt-6 border-t border-gray-200">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Generated Prompts</h2>
                <div className="space-y-4">
                  {generatedPrompts.map((p, index) => (
                    <div className="bg-white p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-gray-200 shadow-sm animate-fadeIn" key={index}>
                      <div className="flex-grow">
                        <p className="text-gray-700">{p.prompt}</p>
                        {p.recommended_model && (
                          <span className="mt-2 inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                            ✨ Optimized for {p.recommended_model}
                          </span>
                        )}
                      </div>
                      <div className="flex-shrink-0 self-end sm:self-center">
                        <CopyButton textToCopy={p.prompt} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
