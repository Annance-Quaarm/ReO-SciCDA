import Link from "next/link";
import { Header } from "@/components/custom/header";
import { Footer } from "@/components/custom/footer";
import { Button } from "@/components/ui/button";
import { Section, SectionTitle, SectionDescription } from "@/components/custom/section";
import { FeatureCard } from "@/components/custom/feature-card";
import { Step } from "@/components/custom/step";
import { TeamCard } from "@/components/custom/team-card";
import { DocumentIcon, DatabaseIcon, TagIcon, CheckSquareIcon } from "@/components/custom/icons";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              ReO:SciCDA — FAIR Publishing for the Next Generation of Science
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-3xl">
              Seamlessly integrate tools like Jupyter, GitHub, and lab notebooks to publish research iteratively using IPFS and decentralized identifiers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button size="lg" asChild>
                <Link href="/login">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#demo">See the Demo</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Features Section */}
      <Section id="features" className="bg-muted/30">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionTitle>Key Features</SectionTitle>
          <SectionDescription>
            ReO:SciCDA combines the best of decentralized technologies with FAIR principles to revolutionize scientific publishing.
          </SectionDescription>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            title="Iterative Publishing"
            description="Publish research at any stage, from preliminary data to final conclusions, with full version control."
            icon={<DocumentIcon />}
          />
          <FeatureCard
            title="Decentralized Storage"
            description="Leverage IPFS for persistent, distributed storage of research data and publications."
            icon={<DatabaseIcon />}
          />
          <FeatureCard
            title="FAIR Compliance"
            description="Automated metadata generation ensures Findability, Accessibility, Interoperability, and Reusability."
            icon={<TagIcon />}
          />
          <FeatureCard
            title="Verifiable Provenance"
            description="Immutable records of contributions and revisions provide transparent attribution and versioning."
            icon={<CheckSquareIcon />}
          />
        </div>
      </Section>

      {/* How It Works Section */}
      <Section id="how-it-works">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionTitle>How It Works</SectionTitle>
            <SectionDescription>
              ReO:SciCDA brings together powerful tools into a seamless workflow for researchers.
            </SectionDescription>
            <div className="space-y-6 mt-8">
              <Step
                number={1}
                title="Connect Your Tools"
                description="Integrate your Jupyter notebooks, GitHub repositories, or lab notes with a simple API."
              />
              <Step
                number={2}
                title="Publish Iteratively"
                description="Share your research at any stage with full version control and provenance tracking."
              />
              <Step
                number={3}
                title="Automatic FAIR Compliance"
                description="Metadata is automatically generated and attached to your publications."
              />
              <Step
                number={4}
                title="Distribute and Collaborate"
                description="Your research is stored on IPFS with decentralized identifiers for persistent access and citation."
              />
            </div>
          </div>
          <div className="bg-muted/30 rounded-lg p-6 h-80 flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">[Diagram Placeholder]</p>
              <p className="text-sm text-muted-foreground mt-2">Visualization of the ReO:SciCDA workflow</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Team Section */}
      <Section id="team" className="bg-muted/30">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionTitle>Meet the Team</SectionTitle>
          <SectionDescription>
            Our interdisciplinary team brings expertise in frontend development, blockchain technology, and FAIR data principles.
          </SectionDescription>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <TeamCard
            name="Prince Yalley"
            role="Architect & Team Lead"
          />
          <TeamCard
            name="Sam Chien"
            role="CTO"
          />
          <TeamCard
            name="Frida Arrey"
            role="CTO"
          />
          <TeamCard
            name="Frederick Nyarko"
            role="Frontend & API"
          />
          <TeamCard
            name="Stephane Nyobe"
            role="Blockchain"
          />
          <TeamCard
            name="Santosh"
            role="FAIRification"
          />
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="text-center max-w-3xl mx-auto">
          <SectionTitle>Ready to Transform Scientific Publishing?</SectionTitle>
          <SectionDescription>
            Join us in making research more open, accessible, and reproducible through decentralized technologies.
          </SectionDescription>
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <Button size="lg" asChild>
              <Link href="#get-started">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#demo">See the Demo</Link>
            </Button>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
