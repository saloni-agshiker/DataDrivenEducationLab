import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";


import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Define TypeScript interfaces for the data structure
interface TopWord {
  word: string;
  weight: number;
}

interface Topic {
  id: number;
  name: string;
  topWords: TopWord[];
}

interface TopicDistribution {
  topic: number;
  weight: number;
}

interface Document {
  id: string;
  title: string;
  topicDistribution: TopicDistribution[];
}

interface LdaOutput {
  topics: Topic[];
  documents: Document[];
}

interface DocumentTopicData {
  name: string;
  value: number;
  topicId: number;
}

// LDA output data
const realLDAOutput: LdaOutput = { // from real dataset
  // Topic-term distributions (probability of terms in each topic)
  // TODO: replace with real LDA output
  topics: [
    {
      id: 0,
      name: "CS 1301 - topic 1",
      topWords: [
        { word: "code", weight: 0.0332 },
        { word: "problem", weight: 0.0242 },
        { word: "amazonawscom", weight: 0.0226 },
        { word: "error", weight: 0.0193 },
        { word: "png", weight: 0.0177 },
        { word: "result", weight: 0.0156 },
        { word: "run", weight: 0.0126 },
        { word: "file", weight: 0.0118 },
        { word: "help", weight: 0.0114 },
        { word: "exercise", weight: 0.0112 }
      ]
    },
    {
      id: 1,
      name: "CS 1301 - topic 2",
      topWords: [
        { word: "time", weight: 0.0146 },
        { word: "python", weight: 0.0094 },
        { word: "class", weight: 0.0088 },
        { word: "score", weight: 0.0077 },
        { word: "use", weight: 0.0077 },
        { word: "hour", weight: 0.0075 },
        { word: "problem", weight: 0.0072 },
        { word: "need", weight: 0.0067 },
        { word: "work", weight: 0.0065 },
        { word: "one", weight: 0.0064 }
      ]
    },
    {
      id: 2,
      name: "CS 1301 - topic 3",
      topWords: [
        { word: "code", weight: 0.0433 },
        { word: "answer", weight: 0.0224 },
        { word: "print", weight: 0.0203 },
        { word: "return", weight: 0.0199 },
        { word: "line", weight: 0.0184 },
        { word: "result", weight: 0.0154 },
        { word: "true", weight: 0.0153 },
        { word: "error", weight: 0.0123 },
        { word: "correct", weight: 0.0120 },
        { word: "wrong", weight: 0.0113 }
      ]
    },
    {
      id: 3,
      name: "CS 1301 - topic 4",
      topWords: [
        { word: "return", weight: 0.0200 },
        { word: "list", weight: 0.0192 },
        { word: "def", weight: 0.0151 },
        { word: "count", weight: 0.0150 },
        { word: "string", weight: 0.0118 },
        { word: "word", weight: 0.0098 },
        { word: "number", weight: 0.0082 },
        { word: "tempchar", weight: 0.0076 },
        { word: "else", weight: 0.0073 },
        { word: "item", weight: 0.0072 }
      ]
    },
    {
      id: 4,
      name: "CS 1301 - topic 5",
      topWords: [
        { word: "course", weight: 0.0308 },
        { word: "problem", weight: 0.0121 },
        { word: "page", weight: 0.0100 },
        { word: "edx", weight: 0.0085 },
        { word: "question", weight: 0.0084 },
        { word: "assignment", weight: 0.0080 },
        { word: "exercise", weight: 0.0075 },
        { word: "access", weight: 0.0073 },
        { word: "exam", weight: 0.0071 },
        { word: "python", weight: 0.0066 }
      ]
    }
  ],

  
  // Document-topic distributions (probability of each topic in documents)
  documents: []
};

// Synthetic dataset output
const syntheticLDAOutput: LdaOutput = { // from real dataset
  // Topic-term distributions (probability of terms in each topic)
  topics: [
    {
      id: 0,
      name: "Synthetic data -  topic 1",
      topWords: [
        { word: "exam", weight: 0.0469 },
        { word: "file", weight: 0.0222 },
        { word: "loop", weight: 0.0222 },
        { word: "final", weight: 0.0191 },
        { word: "code", weight: 0.0191 },
        { word: "python", weight: 0.0161 },
        { word: "test", weight: 0.0130 },
        { word: "handle", weight: 0.0130 },
        { word: "string", weight: 0.0130 },
        { word: "break", weight: 0.0130 }
      ]
    },
    {
      id: 1,
      name: "Synthetic data -  topic 2",
      topWords: [
        { word: "final", weight: 0.0394 },
        { word: "list", weight: 0.0314 },
        { word: "function", weight: 0.0290 },
        { word: "exam", weight: 0.0261 },
        { word: "advanced", weight: 0.0212 },
        { word: "midterm", weight: 0.0186 },
        { word: "dictionary", weight: 0.0162 },
        { word: "loop", weight: 0.0134 },
        { word: "file", weight: 0.0134 },
        { word: "line", weight: 0.0131 }
      ]
    },
    {
      id: 2,
      name: "Synthetic data -  topic 3",
      topWords: [
        { word: "exam", weight: 0.0333 },
        { word: "loop", weight: 0.0257 },
        { word: "handle", weight: 0.0180 },
        { word: "need", weight: 0.0174 },
        { word: "tested", weight: 0.0174 },
        { word: "optional", weight: 0.0167 },
        { word: "clarity", weight: 0.0133 },
        { word: "midterm", weight: 0.0133 },
        { word: "statement", weight: 0.0133 },
        { word: "code", weight: 0.0133 }
      ]
    },
    {
      id: 3,
      name: "Synthetic data -  topic 4",
      topWords: [
        { word: "need", weight: 0.0302 },
        { word: "exam", weight: 0.0264 },
        { word: "function", weight: 0.0191 },
        { word: "final", weight: 0.0191 },
        { word: "file", weight: 0.0191 },
        { word: "detail", weight: 0.0190 },
        { word: "midterm", weight: 0.0153 },
        { word: "list", weight: 0.0124 },
        { word: "variable", weight: 0.0118 },
        { word: "something", weight: 0.0118 }
      ]
    },
    {
      id: 4,
      name: "Synthetic data -  topic 5",
      topWords: [
        { word: "dictionary", weight: 0.0359 },
        { word: "exam", weight: 0.0306 },
        { word: "tested", weight: 0.0266 },
        { word: "list", weight: 0.0260 },
        { word: "question", weight: 0.0213 },
        { word: "string", weight: 0.0199 },
        { word: "statement", weight: 0.0136 },
        { word: "function", weight: 0.0136 },
        { word: "file", weight: 0.0136 },
        { word: "data", weight: 0.0104 }
      ]
    }
  ],
  documents: [],
};

// Colors for the visualization
const COLORS: string[] = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export const LdaVisualization: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<number>(0);
  const [selectedDocument, setSelectedDocument] = useState<string>("doc1");
  
  // Format topic word data for bar chart
  const topicWordData: TopWord[] = realLDAOutput.topics[selectedTopic].topWords;
  const topicWordData2: TopWord[] = syntheticLDAOutput.topics[selectedTopic].topWords;
  
  
  // Custom tooltip formatter for number values
  const numberFormatter = (value: number): string => value.toFixed(3);
  
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Discussion Forum - Ed Discussion Topic Analysis</h1>

        {/* Topic Overview */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Topic Selection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {realLDAOutput.topics.map(topic => (
              <div 
              key={topic.id} 
              className={`p-3 rounded-lg border-2 cursor-pointer ${selectedTopic === topic.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
              onClick={() => setSelectedTopic(topic.id)}
              >
                <h3 className="font-semibold">{topic.name}</h3>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Topic Selection */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Analysis with Real Dataset</h2>
            {/* <div className="mb-4">
              <label className="block text-gray-700 mb-2">Select Course:</label>
              <select 
                className="w-full p-2 border rounded"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(parseInt(e.target.value))}
                >
                {realLDAOutput.topics.map(topic => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </div> */}
            
            <div className="h-64">
              <h3 className="text-lg font-medium mb-2">Top Words for {realLDAOutput.topics[selectedTopic].name}:</h3>
              <ResponsiveContainer width="100%" height="95%">
                <BarChart
                  data={topicWordData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                  >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 0.06]} />
                  <YAxis dataKey="word" type="category" width={80} interval={0}/>
                  <Tooltip formatter={(value: number) => numberFormatter(value)} />
                  <Bar dataKey="weight" fill={COLORS[selectedTopic % COLORS.length]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
         
          {/* Syntheric Dataset visual */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Analysis with Synthetic Dataset</h2>
            {/* <div className="mb-4">
              <label className="block text-gray-700 mb-2">Select Course:</label>
              <select 
                className="w-full p-2 border rounded"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(parseInt(e.target.value))}
                >
                {syntheticLDAOutput.topics.map(topic => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </div> */}
            
            <div className="h-64">
              <h3 className="text-lg font-medium mb-2">Top Words for {syntheticLDAOutput.topics[selectedTopic].name}:</h3>
              <ResponsiveContainer width="100%" height="95%">
                <BarChart
                  data={topicWordData2}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                  >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 0.06]} />
                  <YAxis dataKey="word" type="category" width={80} interval={0}/>
                  <Tooltip formatter={(value: number) => numberFormatter(value)} />
                  <Bar dataKey="weight" fill={COLORS[selectedTopic % COLORS.length]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        
        
        {/* Instructions */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Explanation of Dashboard</h2>
          <p className="text-gray-600 mb-4">
            This is the dashboard for visualizing the output for discussion forum with LDA topic modeling.
            <br/>
            Left side shows the result from real dataset while the right side shows the result 
            from synthetic dataset we generated from our machine learning model.           
          </p>
        </div>
      </div>
    </div>
  );
};


export function meta({}: Route.MetaArgs) {
  return [
    { title: "VIP Data-Driven Education Discussion Forum" },
    { name: "Interactive Dashboard", content: "This dashboard is help users to visualize the output of our analysis." },
  ];
}

export default function Home() {
  return <LdaVisualization/>;
}