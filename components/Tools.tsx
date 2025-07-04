import Image from "next/image";
import leaderboard from "@/assets/images/leaderboard.png";
import xbot from "@/assets/images/xbot.png";
import launchpad from "@/assets/images/launchpad.png";
import accordingwork from "@/assets/images/accordingwork.png";
import acp from "@/assets/images/ACP.png";

export default function Tools() {
  return (
    <div id="features" className="py-16 md:py-25 px-4 md:px-10 bg-black">
      <div className="max-w-[1200px] mx-auto">
        {/* For Investors Section */}
        <div className="flex flex-col items-center mb-20 md:mb-30">
          <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-white">
            For Investors
          </div>
          <div className="text-center text-sm md:text-lg max-w-[700px] text-white/75 mb-12 md:mb-20 px-4 md:px-0">
            Make smarter decisions by seeing who&apos;s really building.
          </div>

          {/* Developer & Project Leaderboard Section */}
          <div className="flex flex-col lg:flex-row gap-6 md:gap-10 w-full">
            <div className="flex-1 flex justify-center">
              <Image
                src={leaderboard}
                alt="leaderboard"
                className="w-full max-w-[400px] md:max-w-[500px] h-auto"
                width={500}
                height={400}
              />
            </div>

            {/* Right side - Description */}
            <div className="flex-1 mt-2 md:mt-5 px-4 md:px-0">
              <div className="text-xl md:text-3xl lg:text-4xl mb-6 md:mb-10 font-semibold text-white">
                Developer & Project Leaderboard
              </div>
              <div className="text-sm md:text-base text-[rgba(255,255,255,0.75)] space-y-3 md:space-y-4">
                <p className="italic">
                  A Dynamic Leaderboard Built On GitHub Data Within The Virtuals
                  Ecosystem.
                </p>
                <p>
                  It Connects Developers And Projects Based On Real
                  Contributions And Helps Surface:
                </p>
                <ul className="list-disc list-inside space-y-1 md:space-y-2">
                  <li>The Most Impactful Builders Across The Ecosystem</li>
                  <li>Active And High-Potential Open-Source Projects</li>
                  <li>
                    Transparent Scores Combining Activity, Influence, And
                    Relevance
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Project Evaluator X Bot Section */}
        <div className="flex flex-col lg:flex-row-reverse gap-6 md:gap-10 w-full mb-20 md:mb-32">
          <div className="flex-1 flex justify-center">
            <Image
              src={xbot}
              alt="xbot"
              className="w-full max-w-[400px] md:max-w-[500px] h-auto"
              width={500}
              height={400}
            />
          </div>
          <div className="flex-1 mt-2 md:mt-5 px-4 md:px-0">
            <div className="text-xl md:text-3xl lg:text-4xl mb-6 md:mb-10 font-semibold text-white">
              Project Evaluator X Bot
            </div>
            <div className="text-sm md:text-base text-[rgba(255,255,255,0.75)] space-y-3 md:space-y-4">
              <p className="italic">
                Evaluate Any Project By Simply Tagging@Hacker X Bot In A
                Comment.
              </p>
              <p>
                We&apos;ll Automatically Analyze And Return A Concise Project
                Report Covering:
              </p>
              <ul className="list-disc list-inside space-y-1 md:space-y-2">
                <li>Core Developers And Their Contribution History</li>
                <li>
                  Project Fundamentals, Growth Potential, And Roadmap Signals
                </li>
                <li>
                  Landscape Analysis Including Competitors And Technical
                  Positioning
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* For Developers Section */}
        <div className="flex flex-col items-center mt-24 md:mt-40 mb-20 md:mb-30">
          <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-white">
            For Developers
          </div>
          <div className="text-center text-sm md:text-lg max-w-[700px] text-white/75 mb-12 md:mb-20 px-4 md:px-0">
            Get Recognized, Get Funded, And Get Rewarded For What You Build.
          </div>

          {/* LaunchPad Section */}
          <div className="flex flex-col lg:flex-row gap-6 md:gap-10 w-full mb-24 md:mb-40">
            {/* Left side - GoHacker Interface */}
            <div className="flex-1 flex justify-center">
              <Image
                src={launchpad}
                alt="launchpad"
                className="w-full max-w-[400px] md:max-w-[500px] h-auto"
                width={500}
                height={400}
              />
            </div>

            {/* Right side - Description */}
            <div className="flex-1 mt-2 md:mt-5 px-4 md:px-0">
              <div className="text-xl md:text-3xl lg:text-4xl mb-6 md:mb-10 font-semibold text-white">
                LaunchPad For Open Source Projects
              </div>
              <div className="text-sm md:text-base text-[rgba(255,255,255,0.75)] space-y-3 md:space-y-4">
                <p className="italic">
                  Raise Funding And Attract Paid Contributors For Critical But
                  Underfunded Projects.
                </p>
                <ul className="list-disc list-inside space-y-1 md:space-y-2">
                  <li>Launch Campaigns And Define Clear Milestone Plans</li>
                  <li>Unlock Rewards Based On Milestone Completion</li>
                  <li>
                    Everything Is Transparent, On-Chain, And Community-Governed
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Fair Reward System Section */}
          <div className="flex flex-col lg:flex-row-reverse gap-6 md:gap-10 w-full mb-24 md:mb-40">
            {/* Right side - Ecosystem Interface */}
            <div className="flex-1 flex justify-center">
              <Image
                src={accordingwork}
                alt="accordingwork"
                className="w-full max-w-[400px] md:max-w-[500px] h-auto"
                width={500}
                height={400}
              />
            </div>
            {/* Left side - Description */}
            <div className="flex-1 mt-2 md:mt-5 px-4 md:px-0">
              <div className="text-xl md:text-3xl lg:text-4xl mb-6 md:mb-10 font-semibold text-white">
                Fair Reward System For Open Source Contributors
              </div>
              <div className="text-sm md:text-base text-[rgba(255,255,255,0.75)] space-y-3 md:space-y-4">
                <p className="italic">
                  Built For Long-Term Contributors And Collaborators
                </p>
                <ul className="list-disc list-inside space-y-1 md:space-y-2">
                  <li>Link GitHub Accounts With Wallets To Verify Identity</li>
                  <li>
                    All Contributions And Task Completions Tracked On-Chain
                  </li>
                  <li>
                    Rewards Distributed Fairly Based On Historical And Ongoing
                    Impact
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Hacker Agent Section */}
          <div className="flex flex-col lg:flex-row gap-6 md:gap-10 w-full">
            {/* Left side - Network Interface */}
            <div className="flex-1 flex justify-center">
              <Image
                src={acp}
                alt="acp"
                className="w-full max-w-[400px] md:max-w-[500px] h-auto"
                width={500}
                height={400}
              />
            </div>

            {/* Right side - Description */}
            <div className="flex-1 mt-2 md:mt-5 px-4 md:px-0">
              <div className="text-xl md:text-3xl lg:text-4xl mb-6 md:mb-10 font-semibold text-white">
                GoHacker Agent: Builder-Centric Intelligence For The ACP Network
              </div>
              <div className="text-sm md:text-base text-[rgba(255,255,255,0.75)] space-y-3 md:space-y-4">
                <p className="italic">
                  Bringing Trustable Project Evaluations Into The Agent
                  Communication Protocol (ACP) Ecosystem.
                </p>
                <ul className="list-disc list-inside space-y-1 md:space-y-2">
                  <li>
                    Joined The ACP Network To Serve As A Decentralized Oracle
                    For Project Construction Quality
                  </li>
                  <li>
                    Offers Independent, Build-Focused Assessments Beyond Market
                    Hype Or Social Media
                  </li>

                  <li>
                    Serves As An Essential Layer For Project Due Diligence,
                    Powering Launch, Invest, And Community Agent Decisions
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
