import { Search } from 'lucide-react';

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div
      className="mb-6 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border border-white border-opacity-20"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
    >
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300"
          size={20}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search users or posts..."
          className="w-full text-white placeholder-cyan-100 border border-white border-opacity-20 rounded-xl p-3 pl-12 focus:outline-none focus:ring-2 focus:ring-purple-400"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
        />
      </div>
    </div>
  );
}
