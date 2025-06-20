export default function Tools() {
  return (
    <div className="py-25 px-4 md:px-10 bg-black">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        <div className="text-4xl font-bold max-w-[1000px] text-center mb-12 text-white md:text-6xl">
          What You Can Do with GoHacker
        </div>
        {/* <div className="text-center text-lg max-w-[700px] font-medium text-white/75 mt-4 mb-12">
          From developer leaderboards to open-source LaunchPads, Lunch provides
          a full-stack solution to evaluate contributions and reward real
          builders in Web3.
        </div> */}
      </div>
      <div className="mt-8  max-w-[1200px] mx-auto ">
        <div className="flex flex-col items-center">
          <div className="text-3xl font-medium text-white mb-2">
            For Investors
          </div>
          <div className="text-center text-lg max-w-[700px] font-medium text-white/75  mb-4">
            Make smarter decisions by seeing who’s really building.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center px-6 py-4 rounded-xl border border-[#222222] bg-[rgba(13,13,13,0.8)] ">
              <div className="text-2xl  font-medium text-white mb-6">
                Developer & Project Leaderboard
              </div>
              <div className="text-base text-[14px] text-[rgba(255,255,255,0.75)] space-y-4 self-start">
                <p className="italic">
                  A dynamic leaderboard built on GitHub data within the Virtuals
                  ecosystem.
                </p>
                <p>
                  It connects developers and projects based on real
                  contributions and helps surface:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>The most impactful builders across the ecosystem</li>
                  <li>Active and high-potential open-source projects</li>
                  <li>
                    Transparent scores combining activity, influence, and
                    relevance
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col items-center px-6 py-4 rounded-xl border border-[#222222] bg-[rgba(13,13,13,0.8)] ">
              <div className="text-2xl  font-medium text-white mb-6">
                Project Evaluator X Bot
              </div>
              <div className="text-base text-[14px] text-[rgba(255,255,255,0.75)] space-y-4 self-start">
                <p className="italic">
                  Evaluate any project by simply tagging
                  <b className="text-white">@GoHacker X Bot</b> in a comment.
                </p>
                <p>
                  We’ll automatically analyze and return a concise project
                  report covering:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Core developers and their contribution history</li>
                  <li>
                    Project fundamentals, growth potential, and roadmap signals
                  </li>
                  <li>
                    Landscape analysis including competitors and technical
                    positioning
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-20">
          <div className="text-3xl font-medium text-white mb-2">
            For Developers
          </div>
          <div className="text-center text-lg max-w-[700px] font-medium text-white/75  mb-4">
            Get recognized, get funded, and get rewarded for what you build.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center px-6 py-4 rounded-xl border border-[#222222] bg-[rgba(13,13,13,0.8)] ">
              <div className="px-3 py-1 text-sm font-medium bg-[#814ac8] text-white rounded-full self-start mb-6">
                Coming Soon
              </div>
              <div className="text-2xl  font-medium text-white mb-6">
                LaunchPad for Open Source Projects
              </div>
              <div className="text-base text-[14px] text-[rgba(255,255,255,0.75)] space-y-4 self-start">
                <p className="italic">
                  Raise funding and attract paid contributors for critical but
                  underfunded projects.
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Launch campaigns and define clear milestone plans</li>
                  <li>Unlock rewards based on milestone completion</li>
                  <li>
                    Everything is transparent, on-chain, and community-governed
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col items-center px-6 py-4 rounded-xl border border-[#222222] bg-[rgba(13,13,13,0.8)] ">
              <div className="px-3 py-1 text-sm font-medium bg-[#814ac8] text-white rounded-full self-start mb-6">
                Coming Soon
              </div>
              <div className="text-2xl font-medium text-white mb-6">
                Fair Reward System for Open Source Contributors
              </div>
              <div className="text-base text-[14px] text-[rgba(255,255,255,0.75)] space-y-4 self-start">
                <p className="italic">
                  Built for long-term contributors and collaborators
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Link GitHub accounts with wallets to verify identity</li>
                  <li>
                    All contributions and task completions tracked on-chain
                  </li>
                  <li>
                    Rewards distributed fairly based on historical and ongoing
                    impact
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
