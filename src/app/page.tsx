import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero/hero";
import { ProblemSolution } from "@/components/landing/problem/problem-solution";
import { AiTeam } from "@/components/landing/ai-team/ai-team";
import { Automation } from "@/components/landing/automation/automation";
import { Features } from "@/components/landing/features/features";
import { Footer } from "@/components/landing/footer/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <ProblemSolution />
        <AiTeam />
        <Automation />
        <Features />
      </main>
      <Footer />
    </>
  );
}
