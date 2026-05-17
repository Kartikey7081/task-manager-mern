import { CAT_COLORS, CATEGORIES } from '../constants';

export default function StatsPanel({ todos }) {
  const total   = todos.length;
  const done    = todos.filter(t => t.done).length;
  const starred = todos.filter(t => t.starred).length;
  const pct     = total ? Math.round((done / total) * 100) : 0;

  const catCounts = CATEGORIES.reduce((acc, c) => {
    acc[c] = todos.filter(t => t.category === c).length;
    return acc;
  }, {});
  const maxCat = Math.max(...Object.values(catCounts), 1);

  return (
    <div className="grid grid-cols-1 gap-4 mb-6">

      {/* Progress Card */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">

        <div className="flex justify-between items-end mb-4">
          
          <div>
            <p className="text-xs text-gray-400 font-semibold mb-1">
              OVERALL PROGRESS
            </p>
 
            <div className="flex gap-6 flex-wrap">
              {[
                ['Total', total, 'text-blue-400'],
                ['Done', done, 'text-green-400'],
                ['Active', total - done, 'text-purple-400'],
                ['Starred', starred, 'text-yellow-400'],
              ].map(([label, val, color]) => (
                <div key={label} className="text-center">
                  <p className={`text-lg font-bold ${color}`}>
                    {val}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-[2px]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Percentage */}
          <div
            className={`text-3xl font-extrabold leading-none ${
              pct === 100 ? 'text-green-400' : 'text-purple-400'
            }`}
          >
            {pct}%
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              pct === 100 ? 'bg-green-400' : 'bg-purple-400'
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Complete message */}
        {pct === 100 && total > 0 && (
          <p className="mt-2 text-sm text-green-400 font-semibold">
            🎉 All tasks complete! Great work!
          </p>
        )}
      </div>

      {/* Category Breakdown */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">

        <p className="text-xs text-gray-400 font-semibold mb-4">
          BY CATEGORY
        </p>

        <div className="flex flex-col gap-3">
          {CATEGORIES.filter(c => catCounts[c] > 0).map(c => (
            <div key={c} className="flex items-center gap-3">

              {/* Category name */}
              <span
                className="text-xs w-16 shrink-0"
                style={{ color: CAT_COLORS[c] }}
              >
                {c}
              </span>

              {/* Bar */}
              <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(catCounts[c] / maxCat) * 100}%`,
                    background: CAT_COLORS[c],
                  }}
                />
              </div>

              {/* Count */}
              <span className="text-xs text-gray-400 w-5 text-right">
                {catCounts[c]}
              </span>
            </div>
          ))}

          {/* Empty state */}
          {Object.values(catCounts).every(v => v === 0) && (
            <p className="text-sm text-gray-500">
              No tasks yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}