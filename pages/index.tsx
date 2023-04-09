import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import React, { useEffect } from "react";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });
import ReactPlayer from "react-player";
import marketImage from "../public/installation_button.svg";
// import videoExplainCode from '../public/assets/explain_code_eng.mp4'
// import videoCodeGen from '../public/installation_button.svg'
// import videoCodeOptimization from '../public/installation_button.svg'
// import videoDocGen from '../public/installation_button.svg'

export default function Home() {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-HEJVZLQ4GV"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-HEJVZLQ4GV');
        `}
      </Script>
      <Head>
        <title>AICommit</title>
        <meta
          name="description"
          content="AI-powered programming assistant for JetBrains IDEs!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#4a4a4a" />
        <meta property="og:title" content="Automates your commit by AI!" />
        <meta
          name="google-site-verification"
          content="XYctT5gtc4q0PyFyA7mLFRlGQxCplYC5XM_SBLjdV6Y"
        />
        <meta
          property="og:description"
          content="AI-powered programming assistant for JetBrains IDEs!"
        />
        <meta property="og:image" content="/og-image.jpg" />
      </Head>
      <main className={styles.main}>
        <div className={styles.aicommitLogo}>
          <a
            href="https://aicommit.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/favicon.svg"
              alt="AICommit logo"
              className={`styles.aicommit-logo`}
              width={80}
              height={80}
              priority
            />
          </a>
        </div>

        <div className={styles.description}>
          <div>
            <h1 className={styles.headline}>AICommit</h1>
            <h2>
              <a href="https://plugins.jetbrains.com/plugin/21289-aicommit">
                AI-powered programming assistant for JetBrains IDEs!
              </a>
            </h2>
          </div>
        </div>
        <div className={styles.jetbrainMarket} id="jetbrainMarket">
          <a
            href="https://plugins.jetbrains.com/plugin/8579-translation"
            target="_blank"
          >
            <Image
              src={marketImage}
              alt="Get from Marketplace"
              width={200}
              height={50}
              title="Get from Marketplace"
            />
          </a>
        </div>
        <div className={styles.mainDescribtion}>
          <p>
            <a href="https://plugins.jetbrains.com/plugin/21289-aicommit">
              AICommit
            </a>{" "}
            is a JetBrains IDE plugin based on OpenAI GPT, which provides a
            range of intelligent coding features, including automated commit
            message generation, code optimization, code interpretation,
            documentation generation, code conversion, and translation. Make
            your coding process more efficient and convenient.
          </p>
        </div>
        <div className={styles.features}>
          <h2>What can AICommit Plugin do?</h2>
          <div>
            <h3>Generate Commit Message</h3>
            <video loop autoPlay muted controls>
              <source src="/assets/commit_vcs_window.mp4" />
            </video>
          </div>
          <div>
            <h3>Explain Code</h3>
            <video loop autoPlay muted controls>
              <source src="/assets/explain_code_eng.mp4" />
            </video>
          </div>
          <div>
            <h3>Code Translate</h3>
            <video loop autoPlay muted controls>
              <source src="/assets/code_translate_eng.mp4" />
            </video>
          </div>
          <div>
            <h3>Code Optimization</h3>
            <video loop autoPlay muted controls>
              <source src="/assets/code_optimization_eng.mp4" />
            </video>
          </div>
          <div>
            <h3>Doc Generation</h3>
            <video loop autoPlay muted controls>
              <source src="/assets/doc_gen_eng.mp4" />
            </video>
          </div>
          <div>
            <h3>Started Guide</h3>
            <div className={styles.video}>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/sDG8cx6i_kM"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        <div className={styles.bottomHeader}>
          <h2>More than that...</h2>
        </div>
        <div className={styles.grid}>
          <a
            href="https://plugins.jetbrains.com/plugin/21289-aicommit"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Jetbrain Market <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Download the plugin from the Jetbrain Marketplace
            </p>
          </a>

          <a
            href="https://github.com/AICommitApp/community/"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              GitHub <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Meet the community and contribute to the project
            </p>
          </a>

          <a
            href="https://github.com/AICommitApp/community/issues/new/choose"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Bug Rpeort <span>-&gt;</span>
            </h2>
            <p className={inter.className}>Report a bug or request a feature</p>
          </a>

          <a
            href="https://github.com/AICommitApp/community/blob/main/EULA.md"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              EULA <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Read the End User License Agreement
            </p>
          </a>
        </div>

        <div className={styles.footer}>
          {/* Built with nextjs by rosuh for aicommit.app */}
          <p>
            Developed by <a href="https://github.com/rosuH">rosuh</a> using
            Next.js for <a href="https://aicommit.app"> aicommit.app </a>{" "}
          </p>
        </div>
      </main>
    </>
  );
}
