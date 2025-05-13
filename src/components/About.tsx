
import React from "react";

const About: React.FC = () => {
  return (
    <div className="space-y-6 pt-2">
      <div className="space-y-2">
        <h3 className="text-primary font-bold">tldr;</h3>
        <p>
          I'm a machine learning engineer with experience in big tech, startup, and
          research environments. My passion lies in developing innovative ML solutions 
          for decentralized systems and other highly technical domains.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-primary font-bold">interests & hobbies</h3>
          <ul className="space-y-1.5">
            <li className="flex items-start">
              <span className="text-terminal-accent mr-2 text-xs">&gt;</span>
              <span>philosophy</span>
            </li>
            <li className="flex items-start">
              <span className="text-terminal-accent mr-2 text-xs">&gt;</span>
              <span>mathematics</span>
            </li>
            <li className="flex items-start">
              <span className="text-terminal-accent mr-2 text-xs">&gt;</span>
              <span>music production</span>
            </li>
            <li className="flex items-start">
              <span className="text-terminal-accent mr-2 text-xs">&gt;</span>
              <span>guitar</span>
            </li>
            <li className="flex items-start">
              <span className="text-terminal-accent mr-2 text-xs">&gt;</span>
              <span>world history</span>
            </li>
            <li className="flex items-start">
              <span className="text-terminal-accent mr-2 text-xs">&gt;</span>
              <span>space & astrophysics</span>
            </li>
            <li className="flex items-start">
              <span className="text-terminal-accent mr-2 text-xs">&gt;</span>
              <span>quantitative finance</span>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-primary font-bold">library</h3>
          <ul className="space-y-1.5">
            <li className="flex items-start">
              <span className="text-terminal-accent mr-2 text-xs">&gt;</span>
              <span><a href="https://www.amazon.com/Singularity-Near-Humans-Transcend-Biology/dp/0670033847" target="_blank" rel="noopener noreferrer" className="hover:text-terminal-accent underline">The Singularity Is Near: When Humans Transcend Biology</a> (Kurzweil)</span>
            </li>
            <li className="flex items-start">
              <span className="text-terminal-accent mr-2 text-xs">&gt;</span>
              <span><a href="https://www.amazon.com/dp/0399562761?ref_=ppx_hzsearch_conn_dt_b_fed_asin_title_34" target="_blank" rel="noopener noreferrer" className="hover:text-terminal-accent underline">The Singularity Is Nearer: When We Merge with AI</a> (Kurzweil)</span>
            </li>
            <li className="flex items-start">
              <span className="text-terminal-accent mr-2 text-xs">&gt;</span>
              <span><a href="https://www.amazon.com/dp/0691118809?ref_=ppx_hzsearch_conn_dt_b_fed_asin_title_30" target="_blank" rel="noopener noreferrer" className="hover:text-terminal-accent underline">The Princeton Companion to Mathematics</a> (Gowers)</span>
            </li>
            <li className="flex items-start">
              <span className="text-terminal-accent mr-2 text-xs">&gt;</span>
              <span><a href="https://www.amazon.com/dp/0674013735?ref_=ppx_hzsearch_conn_dt_b_fed_asin_title_36" target="_blank" rel="noopener noreferrer" className="hover:text-terminal-accent underline">What is Ancient Philosophy?</a> (Hadot)</span>
            </li>
            <li className="flex items-start">
              <span className="text-terminal-accent mr-2 text-xs">&gt;</span>
              <span><a href="https://www.amazon.com/dp/014044517X?ref_=ppx_hzsearch_conn_dt_b_fed_asin_title_14" target="_blank" rel="noopener noreferrer" className="hover:text-terminal-accent underline">Conversations of Socrates</a> (Xenophon)</span>
            </li>
            <li className="flex items-start">
              <span className="text-terminal-accent mr-2 text-xs">&gt;</span>
              <span><a href="https://www.amazon.com/dp/0143107216?ref_=ppx_hzsearch_conn_dt_b_fed_asin_title_16" target="_blank" rel="noopener noreferrer" className="hover:text-terminal-accent underline">The Art of Happiness</a> (Epicurus)</span>
            </li>
            <li className="flex items-start">
              <span className="text-terminal-accent mr-2 text-xs">&gt;</span>
              <span><a href="https://www.amazon.com/dp/B0CV6R443J?ref_=ppx_hzsearch_conn_dt_b_fed_asin_title_27" target="_blank" rel="noopener noreferrer" className="hover:text-terminal-accent underline">Dokkodo: The Way of Walking Alone</a> (Musashi)</span>
            </li>
            <li className="flex items-start">
              <span className="text-terminal-accent mr-2 text-xs">&gt;</span>
              <span><a href="https://www.amazon.com/dp/0142437239?ref_=ppx_hzsearch_conn_dt_b_fed_asin_title_28" target="_blank" rel="noopener noreferrer" className="hover:text-terminal-accent underline">Don Quixote</a> (Cervantes)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
