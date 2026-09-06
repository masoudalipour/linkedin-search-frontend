import type { SearchResult } from "../types/search";

interface Props {
  result: SearchResult;
}

export default function ResultCard({ result }: Props) {
  return (
    <div className="border rounded-lg p-5 shadow-sm hover:shadow-md transition">
      <div className="relative flex items-center gap-3 mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>

        <h2 className="text-xl font-semibold overflow-hidden: break-words">
          {result.full_name}
        </h2>
      </div>

      <p className="text-gray-600">{result.job_title}</p>

      <p className="mt-2">
        <strong>Company:</strong> {result.company}
      </p>

      <p>
        <strong>Industry:</strong> {result.industry}
      </p>

      <p>
        <strong>Location:</strong> {result.location_name}
      </p>

      <p>
        <strong>Skills:</strong>
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {result.skills.map((skill) => (
          <span key={skill} className="bg-gray-100 px-2 py-1 rounded text-sm">
            {skill}
          </span>
        ))}
      </div>

      <p className="mt-4 text-sm text-gray-700">{result.summary}</p>
    </div>
  );
}
