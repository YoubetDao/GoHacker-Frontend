export default function Problems() {
  return (
    <section className="py-25 px-10 bg-black ">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        <div className="text-4xl font-bold max-w-[900px] text-center text-white md:text-6xl">
          Open Source is Dying <br /> Developers Are Leaving
        </div>
        <div className="text-center text-lg max-w-[700px] font-medium text-white/75 mt-4 mb-6">
          Beneath the surface of crypto hype, the infrastructure we all rely on
          is quietly falling apart. Not because it is irrelevant — but because
          the people building it are unpaid, unseen, and burning out
        </div>

        <div className="mt-20 w-full">
          <div className="flex flex-col gap-20">
            <div className="flex flex-col justify-end gap-2 max-w-[600px]">
              <div className="text-4xl font-bold">
                Investors ignore the real builders
              </div>
              <div className="text-lg font-medium text-white/75">
                In the crypto world, developers are the true foundation of every
                project. Yet most investors focus on narratives, TVL, or airdrop
                potential, rarely asking:
                <br />
                - Who are the core developers behind this project?
                <br />
                - Are they still actively building?
                <br />- Is the tech alive, secure, and sustainable?
              </div>
            </div>

            <div className="flex flex-col justify-end gap-2 max-w-[600px] self-end">
              <div className="text-4xl font-bold">
                Open-source projects are stagnating; contributors are
                under-rewarded
              </div>
              <div className="text-lg font-medium text-white/75">
                After studying hundreds of crypto-related open-source
                repositories, we discovered troubling patterns:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-400">✅</span>
                    <h3 className="text-xl font-bold text-white">
                      Once-popular projects
                    </h3>
                  </div>
                  <p className="text-white/75">
                    Devs left due to lack of incentives; projects stalled
                  </p>
                </div>
                <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-red-400">❌</span>
                    <h3 className="text-xl font-bold text-white">
                      &ldquo;Starred&rdquo; repos archived
                    </h3>
                  </div>
                  <p className="text-white/75">
                    Code untouched for months; maintainers inactive
                  </p>
                </div>
                <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-yellow-400">🛑</span>
                    <h3 className="text-xl font-bold text-white">
                      Critical infra unmaintained
                    </h3>
                  </div>
                  <p className="text-white/75">
                    Still widely used, but issues and PRs go unanswered
                  </p>
                </div>
                <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-blue-400">💸</span>
                    <h3 className="text-xl font-bold text-white">
                      Real contributors earn nothing
                    </h3>
                  </div>
                  <p className="text-white/75">
                    Most long-term maintainers receive no token rewards or
                    funding
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-end gap-2 max-w-[600px]">
              <div className="text-4xl font-bold">
                It&apos;s not that these projects aren&apos;t important — it&apos;s that
                contributors can&apos;t keep going
              </div>
              <div className="text-lg font-medium text-white/75">
                These projects aren&apos;t dead because no one needs them.
                <br /> They&apos;re dying because no one can afford to maintain them
                for free.
              </div>
            </div>

            <div className="flex flex-col justify-end gap-2 max-w-[600px] self-end">
              <div className="text-4xl font-bold">What we&apos;re solving</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white/5 p-6 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <span className="text-blue-400">🔍</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">Who&apos;s truly building?</h3>
                    </div>
                    <p className="text-white/75">Use developer data to reveal real activity</p>
                  </div>
                </div>

                <div className="bg-white/5 p-6 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <span className="text-purple-400">🤖</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">How do we measure contribution?</h3>
                    </div>
                    <p className="text-white/75">Build an AI-powered contribution evaluation engine</p>
                  </div>
                </div>

                <div className="bg-white/5 p-6 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <span className="text-green-400">⚖️</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">How should rewards be distributed?</h3>
                    </div>
                    <p className="text-white/75">Design milestone-based, fair distribution mechanisms</p>
                  </div>
                </div>

                <div className="bg-white/5 p-6 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <span className="text-yellow-400">🚀</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">How to revive stalled projects?</h3>
                    </div>
                    <p className="text-white/75">Offer LaunchPad funding & paid contribution campaigns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
