import type { SearchResult } from "../types/search";

interface Props {
  result: SearchResult;
}

export default function ResultCard({ result }: Props) {
  return (
    <div className="border rounded-lg p-5 shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-semibold">{result.full_name}</h2>

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
        {result.skills.slice(0, 8).map((skill) => (
          <span key={skill} className="bg-gray-100 px-2 py-1 rounded text-sm">
            {skill}
          </span>
        ))}
      </div>

      <p className="mt-4 text-sm text-gray-700">{result.summary}</p>
    </div>
  );
}
