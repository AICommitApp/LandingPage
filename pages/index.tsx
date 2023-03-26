import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import React, { useEffect } from "react";
import Script from 'next/script'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
    <Script
          async
          src="https://plugins.jetbrains.com/assets/scripts/mp-widget.js"
          onLoad={() => {
            MarketplaceWidget.setupMarketplaceWidget("install",21289,"#jetbrainMarket");
          }}
        />
      <Head>
        <title>AICommit</title>
        <meta
          name="description"
          content="AICommit automates commit messages and streamlines the development process for developers."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type=" image/svg+xml" />
        <meta name="theme-color" content="#4a4a4a" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <a
            href="https://aicommit.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/favicon.svg"
              alt="AICommit logo"
              className={styles.vercelLogo}
              width={80}
              height={80}
              priority
            />
          </a>
          <div>
            <h1>AICommit</h1>
            <h2>Intellij Platform Plugin</h2>
          </div>
        </div>

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
        <div className={styles.jetbrainMarket} id="jetbrainMarket"></div>
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
            <p>Developed by <a href="https://github.com/rosuH">rosuh</a> using Next.js for <a href="https://aicommit.app"> aicommit.app </a> </p>
        </div>
      </main>
    </>
  );
}
