
import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ExperienceItemProps {
  year: string;
  description: string;
  details?: string[];
  clickable?: boolean;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ year, description, details, clickable = true }) => {
  if (!clickable || !details) {
    return (
      <div className="mb-2">
        <div className="flex items-start">
          <div className="w-16 text-terminal-accent mr-4">{year}</div>
          <div className="flex-1">{description}</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mb-1">
      <AccordionItem value={`${year}-${description}`} className="accordion-item border-0">
        <AccordionTrigger className="w-full no-underline accordion-trigger-no-underline py-1">
          <div className="flex items-start text-left w-full">
            <div className="w-16 text-terminal-accent mr-4">{year}</div>
            <div className="flex-1 hover:text-terminal-accent transition-colors no-underline">{description}</div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-1">
          <div className="ml-20 space-y-2 py-2">
            {details.map((detail, index) => (
              <p key={index} className="flex items-start">
                <span className="text-terminal-accent mr-2 text-xs">&gt;</span>
                <span>{detail}</span>
              </p>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
};

interface AcademicDegreeProps {
  year: string;
  title: string;
  institution: string;
  gpa: string;
  coursework: string[];
}

const AcademicDegree: React.FC<AcademicDegreeProps> = ({ year, title, institution, gpa, coursework }) => {
  return (
    <div className="mb-1">
      <AccordionItem value={`${year}-${title}`} className="accordion-item border-0">
        <AccordionTrigger className="w-full no-underline accordion-trigger-no-underline py-1">
          <div className="flex items-start text-left w-full">
            <div className="w-16 text-terminal-accent mr-4">{year}</div>
            <div className="flex-1 hover:text-terminal-accent transition-colors no-underline">
              {title}
              <div className="text-xs text-muted-foreground mt-0.5">{institution}</div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-1">
          <div className="ml-20 py-2 space-y-2">
            {gpa !== "N/A" && 
              <p className="flex items-start mb-2">
                <span className="text-terminal-accent mr-2 text-xs">&gt;</span>
                <span>GPA: {gpa}</span>
              </p>
            }
            <p className="font-medium mt-1 mb-1">coursework:</p>
            <ul className="space-y-1.5">
              {coursework.map((course, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-terminal-accent mr-2 text-xs">&gt;</span>
                  <span>{course}</span>
                </li>
              ))}
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
};

const Experience: React.FC = () => {
  return (
    <div className="space-y-8 text-sm pt-2">
      <div>
        <h3 className="text-primary font-bold mb-2">industry</h3>
        <div>
          <ExperienceItem 
            year="2024" 
            description="joined OpenGradient as a full-time ML engineer" 
            clickable={false}
          />
          <ExperienceItem 
            year="2022" 
            description="returned to Coinbase as a full-time ML engineer" 
            clickable={false}
          />
          <ExperienceItem 
            year="2021" 
            description="software engineering intern, machine learning at Coinbase"
            clickable={false}
          />
          <ExperienceItem 
            year="2020" 
            description="software engineering internships" 
            clickable={false}
          />
        </div>
      </div>

      <div>
        <h3 className="text-primary font-bold mb-2">academics</h3>
        <Accordion type="single" collapsible className="w-full">
          <AcademicDegree 
            year="2024" 
            title="M.S. in Applied & Computational Mathematics" 
            institution="Johns Hopkins University"
            gpa="N/A"
            coursework={[
             "Multivariable Calculus & Complex Analysis",
             "Introduction to Ordinary and Partial Differential Equations" 
            ]}
          />
          <AcademicDegree 
            year="2022" 
            title="M.S. in Computer Science & Engineering" 
            institution="Lehigh University"
            gpa="3.3"
            coursework={[
              "Machine Learning", 
              "Computer Vision", 
              "Natural Language Processing", 
              "Parallel Computing"
            ]}
          />
          <AcademicDegree 
            year="2021" 
            title="B.S. in Computer Science & Business" 
            institution="Lehigh University"
            gpa="3.3"
            coursework={[
              "Intro to Programming (Teaching Assistant)",
              "Programming & Data Structures (Teaching Assistant)",
              "Systems Software (Teaching Assistant)",
              "Database Systems & Applications",
              "Discrete Structures & Algorithms",
              "Design & Analysis of Algorithms",
              "Software Engineering (Teaching Assistant)",
              "Programming Languages (Head Teaching Assistant)",
              "Computer Architecture & Organization",
              "Blockchain Concepts & Applications",
              "Blockchain Algorithms"
            ]}
          />
          <ExperienceItem 
            year="2017" 
            description="began journey in computer science at Lehigh University" 
            clickable={false}
          />
        </Accordion>
      </div>

      <div>
        <h3 className="text-primary font-bold mb-2">research</h3>
        <Accordion type="single" collapsible className="w-full">
          <ExperienceItem 
            year="2020" 
            description="SSS-RP, Scalable Systems Software Research" 
            details={[
              "Drafted and mocked a decentralized voting system built on top of the Ethereum blockchain.",
              "Researched hardware acceleration, parallel computing optimization, and distributed systems practices.",
              "Designed Automatic Differentiation techniques for MECH programming language."
            ]}
          />
        </Accordion>
      </div>

      <div>
        <h3 className="text-primary font-bold mb-2">leadership</h3>
        <Accordion type="single" collapsible className="w-full">
          <ExperienceItem 
            year="2019" 
            description="Founder & President, Lehigh ACM" 
            details={[
              "Created LU's largest computer science club, over 500 members as of 2024.",
              "Facilitated peer mentoring, programming focused lectures, professional development events, and technical workshops."
            ]}
          />
          <ExperienceItem 
            year="2020" 
            description="Technical Development Chair, Computer Science & Business Association" 
            details={[
              "Organized and distributed intellectual resources for over 200+ current and former CSB students."
            ]}
          />
        </Accordion>
      </div>
    </div>
  );
};

export default Experience;
