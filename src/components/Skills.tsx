
import React from "react";

const Skills: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-terminal-accent font-bold mb-2">abstract</h3>
        <div className="space-y-3 text-sm">
          <p>
            In my professional journey, I've developed a comprehensive understanding of building, deploying, and maintaining 
            production-grade machine learning systems. I've gained practical expertise in establishing reliable ML pipelines 
            that balance model performance with operational reliability.
          </p>
          <p>
            My experience spans the full ML lifecycle - from data preparation and feature engineering to model development, 
            deployment, and monitoring. I've worked extensively with distributed computing frameworks to scale ML workflows 
            across large datasets and complex infrastructure.
          </p>
          <p>
            My industry experience includes working at OpenGradient, where I focus on decentralized ML infrastructure and modeling, 
            and Coinbase, where I contributed to the development of the machine learning platform. I've developed expertise in building 
            and maintaining ML platforms, implementing responsible AI practices, and designing decentralized ML architectures on 
            blockchain infrastructure.
          </p>
          <p>
            In the blockchain and Web3 space, I've cultivated specialized knowledge in building decentralized applications, 
            implementing smart contract integrations, and developing systems that bridge traditional machine learning with 
            blockchain technology.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="text-terminal-accent font-bold mb-1">machine learning infrastructure & engineering</h3>
          <p className="text-sm">Python, Git, AWS, PyTorch, ONNX, TensorFlow, Anyscale Ray, Databricks, Spark, Flink, Kafka, Docker, Airflow2, Kubernetes, Tecton, Google Cloud, vLLM</p>
          <p className="text-sm">XGBoost, CatBoost, Model Explainability, ML Observability, Feature Engineering, Retraining Pipelines, Hyperparameter Tuning</p>
        </div>
        
        <div>
          <h3 className="text-terminal-accent font-bold mb-1">other languages and technologies</h3>
          <p className="text-sm">C/C++, Java, JavaScript, TypeScript, Rust, JDBC, Swift, Linux, MongoDB, SQL & pSQL, GNU & UNIX, OracleDB, CSS3, Firebase, C#, Heroku Cloud, Go, express.js, Vue, HTML5, React, Node.js, IPFS</p>
        </div>
      </div>
    </div>
  );
};

export default Skills;
