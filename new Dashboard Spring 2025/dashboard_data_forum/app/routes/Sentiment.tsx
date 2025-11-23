import type { Route } from "./+types/home";
import React, { useState, createContext, useContext } from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ children, className = "", ...rest }: CardProps) {
  return (
    <div className={`rounded-lg shadow bg-white ${className}`} {...rest}>
      {children}
    </div>
  );
}

export function CardHeader({ children }: { children?: React.ReactNode }) {
  return <div className="p-4 border-b">{children}</div>;
}

export function CardTitle({ children }: { children?: React.ReactNode }) {
  return <h3 className="text-lg font-semibold">{children}</h3>;
}

export function CardDescription({ children }: { children?: React.ReactNode }) {
  return <p className="text-sm text-gray-600">{children}</p>;
}

export function CardContent({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

type OnValueChange = (val: string) => void;

const SelectContext = createContext<OnValueChange | null>(null);

export function Select({ children, onValueChange }: { children?: React.ReactNode; onValueChange: OnValueChange }) {
  return <SelectContext.Provider value={onValueChange}>{children}</SelectContext.Provider>;
}

export function SelectTrigger({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={`cursor-pointer p-2 border rounded ${className}`}>
      {children}
    </div>
  );
}

export function SelectValue({ placeholder, children }: { placeholder?: string; children?: React.ReactNode }) {
  return <span className="text-sm text-gray-700">{children ?? placeholder}</span>;
}

export function SelectContent({ children }: { children?: React.ReactNode }) {
  return <div className="mt-2 border rounded bg-white shadow-lg">{children}</div>;
}

export function SelectItem({ value, children }: { value: string; children?: React.ReactNode }) {
  const onValueChange = useContext(SelectContext);
  return (
    <div
      className="p-2 hover:bg-gray-100 rounded cursor-pointer"
      onClick={() => onValueChange?.(value)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onValueChange?.(value);
      }}
    >
      {children}
    </div>
  );
}

interface SentimentResult {
    sentence: string;
    sentiment: "positive" | "negative" | "neutral";
    score: number; // TODO: add confidence score
    grade?: number;
}

export function meta() {
  return [
    { title: "Sentiment Analysis Dashboard" },
    { name: "description", content: "Analyze sentiment of text examples" },
  ];
}

export default function SentimentAnalysis() {
    const [selectedSentence, setSelectedSentence] = useState<string>("");

    const exampleSentences = [
        "Awesome and thanks you so much. It worked.",
        "Thanks, I had figured out that part but I am sorry that I did not describe clearly. I knew that I was evaluating only the first line, but I think did not realize that how could I resolve that problem. May be by changing the indent of the return? But may be there is more to it as I have tried a lot of ways.",
        "I have seen a book about python projects which may be fun on the side. It could be advanced though....",
        "You're welcome!",
        "The secret was just about using the \"math.e\".  It's a mathematical constant.",
    ];

     // Precomputed sentiment results for specific sentences
    const precomputedSentiments: Record<string, SentimentResult> = {
        "Awesome and thanks you so much. It worked.": {
            sentence: "Awesome and thanks you so much. It worked.",
            sentiment: "positive",
            score: 1,
            grade: 0.91
        },
        "Thanks, I had figured out that part but I am sorry that I did not describe clearly. I knew that I was evaluating only the first line, but I think did not realize that how could I resolve that problem. May be by changing the indent of the return? But may be there is more to it as I have tried a lot of ways.": {
            sentence: "Thanks, I had figured out that part but I am sorry that I did not describe clearly. I knew that I was evaluating only the first line, but I think did not realize that how could I resolve that problem. May be by changing the indent of the return? But may be there is more to it as I have tried a lot of ways.",
            sentiment: "neutral",
            score: 1,
            grade: 0.91
        },
        "I have seen a book about python projects which may be fun on the side. It could be advanced though....": {
            sentence: "I have seen a book about python projects which may be fun on the side. It could be advanced though....",
            sentiment: "neutral",
            score: 1,
            grade: 0.88
        },
        "You're welcome!": {
            sentence: "You're welcome!",
            sentiment: "positive",
            score: 1,
            grade: 0.98
        },
        "The secret was just about using the \"math.e\".  It's a mathematical constant.": {
            sentence: "The secret was just about using the \"math.e\".  It's a mathematical constant.",
            sentiment: "neutral",
            score: 1
        }
    };

    const analyzeSentiment = (sentence: string): SentimentResult => {
        // Hard code precomputed results
        if (precomputedSentiments[sentence]) {
            return precomputedSentiments[sentence];
        }

        // TODO: Replace with actual sentiment analysis model API
        const positiveWords = ["love", "excited", "excellent", "amazing", "wonderful", "exceeded"];
        const negativeWords = ["worst", "terrible", "disappointed", "awful", "hate"];
        
        const lowerSentence = sentence.toLowerCase();
        const hasPositive = positiveWords.some(word => lowerSentence.includes(word));
        const hasNegative = negativeWords.some(word => lowerSentence.includes(word));
        
        let sentiment: "positive" | "negative" | "neutral" = "neutral";
        let score = 0.5;
        
        if (hasPositive && !hasNegative) {
            sentiment = "positive";
            score = 0.85;
        } else if (hasNegative && !hasPositive) {
            sentiment = "negative";
            score = 0.15;
        }
        
        return { sentence, sentiment, score };
    };


    const result = selectedSentence ? analyzeSentiment(selectedSentence) : null;

    // Pre-analyzed examples for showcase
    const showcaseExamples = [
        analyzeSentiment("I absolutely love the course."),
        analyzeSentiment("I hate this")
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Sentiment Analysis Result</h1>
                </div>

                {/* Showcase Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Example Results</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {showcaseExamples.map((example, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle>Example {index + 1}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 mb-2">Sentence:</p>
                                        <p className="text-base italic">"{example.sentence}"</p>
                                    </div>
                                    
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 mb-2">Sentiment:</p>
                                        <span
                                            className={`inline-block px-3 py-1 rounded-full text-white text-sm font-semibold ${
                                                example.sentiment === "positive"
                                                    ? "bg-green-500"
                                                    : example.sentiment === "negative"
                                                    ? "bg-red-500"
                                                    : "bg-gray-500"
                                            }`}
                                        >
                                            {example.sentiment.toUpperCase()}
                                        </span>
                                    </div>
                                    
                                    {/* <div>
                                        <p className="text-sm font-medium text-gray-600 mb-2">Confidence:</p>
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 bg-gray-200 rounded-full h-3">
                                                <div
                                                    className={`h-3 rounded-full transition-all ${
                                                        example.sentiment === "positive"
                                                            ? "bg-green-500"
                                                            : example.sentiment === "negative"
                                                            ? "bg-red-500"
                                                            : "bg-gray-500"
                                                    }`}
                                                    style={{ width: `${example.score * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-base font-semibold min-w-[3rem] text-right">
                                                {(example.score * 100).toFixed(0)}%
                                            </span>
                                        </div>
                                    </div> */}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Interactive Section */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">More examples from CS1301</h2>
                    <Card>
                        <CardHeader>
                            <CardTitle>Select a Sentence</CardTitle>
                            <CardDescription>Choose a sentence from the dropdown to see the result</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Select onValueChange={setSelectedSentence}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a sentence..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {exampleSentences.map((sentence, index) => (
                                        <SelectItem key={index} value={sentence}>
                                            {sentence}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>
                </div>

                {result && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Analysis Result</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-2">Selected Sentence:</p>
                                <p className="text-lg">"{result.sentence}"</p>
                            </div>
                            
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-2">Sentiment:</p>
                                <span
                                    className={`inline-block px-4 py-2 rounded-full text-white font-semibold ${
                                        result.sentiment === "positive"
                                            ? "bg-green-500"
                                            : result.sentiment === "negative"
                                            ? "bg-red-500"
                                            : "bg-gray-500"
                                    }`}
                                >
                                    {result.sentiment.toUpperCase()}
                                </span>
                            </div>
                            
                            {/* <div>
                                <p className="text-sm font-medium text-gray-600 mb-2">Confidence Score:</p>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 bg-gray-200 rounded-full h-4">
                                        <div
                                            className={`h-4 rounded-full transition-all ${
                                                result.sentiment === "positive"
                                                    ? "bg-green-500"
                                                    : result.sentiment === "negative"
                                                    ? "bg-red-500"
                                                    : "bg-gray-500"
                                            }`}
                                            style={{ width: `${result.score * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-lg font-semibold">{(result.score * 100).toFixed(0)}%</span>
                                </div>
                            </div> */}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}