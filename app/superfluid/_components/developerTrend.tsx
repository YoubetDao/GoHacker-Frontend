import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

interface DeveloperTrend {
  date: string;
  [key: string]: number | string; // 动态的开发者数据
}

interface DeveloperTrendsProps {
  startDate?: Date;
  endDate?: Date;
}

interface RankData {
  actor_login: string;
  openrank: number;
  activity: number;
  created_at: string;
}

interface ApiResponse {
  data: RankData[];
  total: number;
}

const generateColorFromUsername = (username: string) => {
  // 简单的字符串hash函数
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    const char = username.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 转换为32位整数
  }
  
  // 确保hash为正数，并映射到0-360的色相范围
  const hue = Math.abs(hash) % 360;
  // 使用较高的饱和度和亮度，确保颜色鲜明好看
  return `hsl(${hue}, 70%, 55%)`;
};

export const DeveloperTrends = ({
  startDate,
  endDate,
}: DeveloperTrendsProps) => {
  const [data, setData] = useState<DeveloperTrend[]>([]);
  const [loading, setLoading] = useState(true);
  const [developers, setDevelopers] = useState<string[]>([]);
  const [selectedDevelopers, setSelectedDevelopers] = useState<Set<string>>(
    new Set()
  );
  const [developerColors, setDeveloperColors] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/v1/ranks/developers");
        if (!response.ok) {
          throw new Error("Failed to fetch developer trends");
        }
        const result: ApiResponse = await response.json();

        if (!result.data || !Array.isArray(result.data)) {
          throw new Error("Invalid data format received");
        }

        // 处理数据
        const developerMap = new Map<
          string,
          { openrank: number; date: string }[]
        >();
        const allDevelopers = new Set<string>();
        const colors: Record<string, string> = {};

        // 按开发者分组数据
        result.data.forEach((dev) => {
          if (!dev.actor_login || !dev.created_at) {
            return; // Skip invalid entries
          }
          if (!developerMap.has(dev.actor_login)) {
            developerMap.set(dev.actor_login, []);
            allDevelopers.add(dev.actor_login);
            colors[dev.actor_login] = generateColorFromUsername(dev.actor_login);
          }
          developerMap.get(dev.actor_login)?.push({
            openrank: dev.openrank || 0,
            date: dev.created_at,
          });
        });

        // 获取所有唯一的日期
        const allDates = new Set(
          result.data.map((item) => item.created_at).filter(Boolean) // Remove any null/undefined dates
        );
        const sortedDates = Array.from(allDates).sort();

        // 构建图表数据
        const processedData: DeveloperTrend[] = sortedDates.map((date) => {
          const dataPoint: DeveloperTrend = { date };
          developerMap.forEach((devData, devName) => {
            const dateData = devData.find((d) => d.date === date);
            if (dateData) {
              dataPoint[devName] = dateData.openrank;
            }
          });
          return dataPoint;
        });

        const devArray = Array.from(allDevelopers);
        setData(processedData);
        setDevelopers(devArray);
        setDeveloperColors(colors);
        // 默认选择前5个开发者
        setSelectedDevelopers(new Set(devArray.slice(0, 5)));
      } catch (error) {
        console.error("Error fetching developer trends:", error);
        setData([]);
        setDevelopers([]);
        setSelectedDevelopers(new Set());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  const toggleDeveloper = (developer: string) => {
    setSelectedDevelopers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(developer)) {
        newSet.delete(developer);
      } else {
        newSet.add(developer);
      }
      return newSet;
    });
  };

  const toggleAll = () => {
    setSelectedDevelopers((prev) => {
      if (prev.size === developers.length) {
        // 如果已经全选，则清空选择
        return new Set();
      } else {
        // 否则全选
        return new Set(developers);
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const isAllSelected = selectedDevelopers.size === developers.length;

  return (
    <div className="w-full bg-black/20 backdrop-blur-sm rounded-xl border border-purple-800/20 p-6 max-h-[800px]">
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-400">
          {selectedDevelopers.size} developers selected
        </div>
      </div>

      {/* 滚动提示 */}
      {data.length > 10 && (
        <div className="flex items-center gap-2 mb-2 text-xs text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <span>Scroll horizontally to view all data points</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      )}
      
      <div className="w-full h-[600px] overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-purple-500">
        <div 
          className="w-full h-full"
          style={{ 
            minWidth: Math.max(800, data.length * 60) + 'px' 
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis
                dataKey="date"
                stroke="#9ca3af"
                interval={Math.max(0, Math.floor(data.length / 10))}
                tickFormatter={(value) => {
                  try {
                    const date = new Date(value);
                    if (isNaN(date.getTime())) {
                      return "Invalid Date";
                    }
                    return format(date, "MMM dd");
                  } catch {
                    return "Invalid Date";
                  }
                }}
              />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(17, 24, 39, 0.9)",
                  border: "1px solid rgba(167, 139, 250, 0.2)",
                  borderRadius: "0.5rem",
                  color: "#fff",
                }}
                formatter={(value: number) => value.toFixed(2)}
              />
              <Legend />
              {Array.from(selectedDevelopers).map((developer) => (
                <Line
                  key={developer}
                  type="monotone"
                  dataKey={developer}
                  name={developer}
                  stroke={developerColors[developer]}
                  dot={false}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-gray-400">
            Select Developers to Display
          </h3>
          <button
            onClick={toggleAll}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              isAllSelected
                ? "bg-purple-500/20 text-purple-300 border-purple-500/50"
                : "bg-black/20 text-gray-400 border-gray-700/30"
            } border hover:border-purple-500/50`}
          >
            {isAllSelected ? "Deselect All" : "Select All"}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {developers.map((developer) => (
            <button
              key={developer}
              onClick={() => toggleDeveloper(developer)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedDevelopers.has(developer)
                  ? "bg-purple-500/20 text-purple-300 border-purple-500/50"
                  : "bg-black/20 text-gray-400 border-gray-700/30"
              } border hover:border-purple-500/50`}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: developerColors[developer] }}
                />
                {developer}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
