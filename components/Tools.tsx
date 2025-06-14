export default function Tools() {
  return (
    <div className="py-25 px-4 md:px-10 bg-black">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        <div className="text-4xl font-bold max-w-[1000px] text-center text-white md:text-6xl">
          Tools Built for Those Who Build
        </div>
        <div className="text-center text-lg max-w-[700px] font-medium text-white/75 mt-4 mb-12">
          From developer leaderboards to open-source LaunchPads, Lunch provides
          a full-stack solution to evaluate contributions and reward real
          builders in Web3.
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1200px] mx-auto">
        <div className="flex flex-col items-center px-6 py-4 rounded-xl border border-[#222222] bg-[rgba(13,13,13,0.8)] ">
          <div className="text-2xl  font-medium text-white mb-6">
            Developer Leaderboard
          </div>
          <div className="text-base text-[14px] text-[rgba(255,255,255,0.75)] space-y-4 self-start">
            <p className="italic">
              Discover the most impactful developers across the Web3 ecosystem
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Scored based on GitHub activity, commit quality, PR merge rate,
                and more
              </li>
              <li>Filter by blockchain, category, or project</li>
              <li>Identify true builders with transparent contribution data</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center px-6 py-4 rounded-xl border border-[#222222] bg-[rgba(13,13,13,0.8)] ">
          <div className="text-2xl  font-medium text-white mb-6">
            X Bot: Project Evaluator
          </div>
          <div className="text-base text-[14px] text-[rgba(255,255,255,0.75)] space-y-4 self-start">
            <p className="italic">
              Instantly analyze the technical activity of any open-source
              project
            </p>
            <p>Input a GitHub repo URL and get:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Core contributor count & activity timeline</li>
              <li>Commit frequency and update history</li>
              <li>Stack freshness and dependency quality</li>
            </ul>
            <p>Generates a shareable, data-backed project score</p>
          </div>
        </div>
        <div className="flex flex-col items-center px-6 py-4 rounded-xl border border-[#222222] bg-[rgba(13,13,13,0.8)] ">
          <div className="px-3 py-1 text-sm font-medium bg-[#814ac8] text-white rounded-full self-start mb-6">
            Coming Soon
          </div>
          <div className="text-2xl  font-medium text-white mb-6">
            LaunchPad for Open Source Projects
          </div>
          <div className="text-base text-[14px] text-[rgba(255,255,255,0.75)] space-y-4 self-start">
            <p className="italic">
              Decentralized fundraising and incentive tool for critical but
              underfunded repos
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Project owners can launch funding campaigns and define milestone
                plans
              </li>
              <li>
                Raised tokens are distributed over time based on milestone
                completion
              </li>
              <li>
                Entire process is on-chain, transparent, and governed by the
                community
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center px-6 py-4 rounded-xl border border-[#222222] bg-[rgba(13,13,13,0.8)] ">
          <div className="px-3 py-1 text-sm font-medium bg-[#814ac8] text-white rounded-full self-start mb-6">
            Coming Soon
          </div>
          <div className="text-2xl font-medium text-white mb-6">
            According.Work Integration
          </div>
          <div className="text-base text-[14px] text-[rgba(255,255,255,0.75)] space-y-4 self-start">
            <p className="italic">
              Collaborating with According.Work to power fair token distribution
              for contributors
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Contributors connect verified GitHub accounts with wallets
              </li>
              <li>
                All task completions and contributions are tracked on-chain
              </li>
              <li>
                Supports dual incentive models: governance tokens + LaunchPad
                tokens
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
