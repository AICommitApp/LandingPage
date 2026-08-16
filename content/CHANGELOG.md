<!-- Keep a Changelog guide -> https://keepachangelog.com -->

# AICommit Changelog

## [Unreleased]

## [3.7.0] - 2026-07-11

### Added

- Claude: Set up Claude directly from the Commit tool window when credentials are missing.
- DeepSeek: Added a dedicated Thinking Mode experience with live reasoning progress and reliable token statistics. Reasoning content is never inserted into commits, stored in history, or sent in telemetry.
- Diagnostics: Added a Copy diagnostic info action to make provider errors easier to troubleshoot.
- Model Catalog: View model context windows and continue browsing bundled model data when the remote catalog is unavailable.

### Improved

- Settings: Redesigned provider configuration with dedicated pages, a clearer overview, consistent status indicators, inline reset actions, and clearer data-handling guidance.
- Commit Tool Window: Simplified the layout, moved provider selection to the title bar, made temperature easier to edit, and clarified preparing, reasoning, success, and error states.
- Accessibility: Improved keyboard navigation, focus behavior, contrast, responsive text wrapping, and light/dark theme consistency.
- Providers and Models: Updated default model lists, improved compatibility across supported providers, and made the model catalog faster and more reliable.

### Fixed

- Commit Selection: Commit message generation now respects the changes selected for the current commit when launched from the AICommit tool window.
- Streaming: Incomplete responses now report an error instead of appearing successful; cancellation and provider or network failures are handled more reliably.
- Commit UI: Fixed generation and refresh issues across different commit workflows.
- Provider Setup: Temperature edits are saved before generation, and missing credentials now open the correct editable provider settings.
- Model Catalog: Fixed lost selections and clarified the difference between an empty catalog and no search matches.

## [3.6.1] - 2026-05-26

### Added

- DeepSeek: first-class provider with inline first-run setup.
- OpenAI-compatible: configure multiple profiles for custom endpoints and switch between them directly from the tool window.
- First-run: one-click local Ollama quick setup and contextual deep links from the tool window into the right Settings tab/field.
- History: commit-message history is now persisted per project.
- Telemetry: opt-out toggle in Settings with a privacy disclosure in About.
- UI: brand icons for built-in providers (OpenAI, Gemini, Azure, Claude, Ollama, DeepSeek) in the tool window provider dropdown and Settings provider tabs.
- UI: added the guarded provider settings navigation foundation.

### Improved

- Onboarding: inline readiness guidance in the tool window after first success.
- Settings: internal navigation between the Provider and About sections.
- DeepSeek: refined Japanese and Korean copy.
- UI: converged the phase 1 design tokens.

### Fixed

- Settings: removed an outer horizontal scrollbar and constrained the Data Handling privacy notice width.
- Commit Action: requires included changes at click time to avoid empty-selection generations.
- OpenAI-compatible: preserve profile references when Settings loads before profiles are fully populated.
- Telemetry: removed the IntelliJ internal `PluginManagerCore.getPlugin(PluginId)` call from plugin version reporting, resolving the Marketplace Internal API warning.

## [3.6.0] - 2026-05-24

### Added

- DeepSeek: first-class provider with inline first-run setup.
- OpenAI-compatible: configure multiple profiles for custom endpoints and switch between them directly from the tool window.
- First-run: one-click local Ollama quick setup and contextual deep links from the tool window into the right Settings tab/field.
- History: commit-message history is now persisted per project.
- Telemetry: opt-out toggle in Settings with a privacy disclosure in About.
- UI: brand icons for built-in providers (OpenAI, Gemini, Azure, Claude, Ollama, DeepSeek) in the tool window provider dropdown and Settings provider tabs.

### Improved

- Onboarding: inline readiness guidance in the tool window after first success.
- Settings: internal navigation between the Provider and About sections.
- DeepSeek: refined Japanese and Korean copy.

### Fixed

- Settings: removed an outer horizontal scrollbar and constrained the Data Handling privacy notice width.
- Commit Action: requires included changes at click time to avoid empty-selection generations.
- OpenAI-compatible: preserve profile references when Settings loads before profiles are fully populated.

## [3.5.1] - 2026-04-19

### Fixed

- OpenAI: preserve responses newline deltas.

## [3.5.0] - 2026-04-07

### Added

- Ollama: support for thinking models (e.g. DeepSeek-R1, kimi-k2.5) with adaptive context handling.
- Live streaming progress in the result panel with automatic scroll-follow.
- Settings: redesigned provider tabs with clearer active provider selection.
- Added Gemini model list; updated default models across providers.

### Improved

- Standardized internal helper naming by removing misleading `ForTest` suffixes and keeping test-only helpers explicit.
- Reduced provider service trace noise and kept key mismatch/switch traces in local debug flow.
- Centralized provider capability decisions (temperature/role/token counting mode) under a shared entrypoint.
- Routed diff chunking branch selection through capability token counting mode while preserving provider-specific behavior.
- Made token metadata fallback decisions explicitly track source (`DIRECT/BACKEND/AZURE_OPENAI_FALLBACK/NONE`) for clearer diagnostics and tests.

### Fixed

- `getCurrentAI()` now deterministically resolves to the configured provider from Settings.
- Unversioned file diff extraction now correctly handles deleted files and directories before text/binary branches.
- `stopGenerate()` now uses snapshot-then-clear to avoid losing cancellation on concurrently added jobs.

## [3.4.4] - 2026-02-26

### Added

- Added catalog-based model management to make provider/model selection more consistent.

### Improved

- OpenAI now defaults to the `responses` endpoint mode.
- Improved stability for streaming responses and model list refresh.

### Fixed

- Kept prompt drafts when switching providers or models.
- Prevented duplicate auto dialogs during a single interaction.
- Improved OpenAI error messages for clearer troubleshooting.
- Opened Settings directly when the API token is missing.
- Improved localization for model-manager and no-model messages.

## [3.4.3] - 2026-02-25

### Added

- Added catalog-based model management to make provider/model selection more consistent.

### Improved

- OpenAI now defaults to the `responses` endpoint mode.
- Improved stability for streaming responses and model list refresh.

### Fixed

- Kept prompt drafts when switching providers or models.
- Prevented duplicate auto dialogs during a single interaction.
- Improved OpenAI error messages for clearer troubleshooting.
- Opened Settings directly when the API token is missing.
- Improved localization for model-manager and no-model messages.

## [3.4.2] - 2026-02-23

### Added

- Added catalog-based model management to make provider/model selection more consistent.

### Improved

- OpenAI now defaults to the `responses` endpoint mode.
- Improved stability for streaming responses and model list refresh.

### Fixed

- Kept prompt drafts when switching providers or models.
- Prevented duplicate auto dialogs during a single interaction.
- Improved OpenAI error messages for clearer troubleshooting.
- Opened Settings directly when the API token is missing.
- Improved localization for model-manager and no-model messages.

## [3.4.1] - 2026-02-12

- Added support for **Claude** and **Ollama** models.
- Improved commit message quality with better handling of large and complex diffs.
- Made provider switching more reliable and smoother across different AI services.
- Improved model settings and configuration flow, including better Claude/Ollama setup experience.
- Reduced generation failures in edge cases and improved fallback behavior.
- Enhanced overall stability and responsiveness during generation.
- 新增对 **Claude** 和 **Ollama** 模型的支持。
- 优化了对大型和复杂 diff 的处理，提升提交信息生成质量。
- 提升了不同 AI 服务之间 Provider 切换的稳定性和流畅性。
- 改进了模型设置与配置流程，优化了 Claude/Ollama 的配置体验。
- 降低了边缘场景下的生成失败率，并改进了回退行为。
- 提升了生成过程中的整体稳定性与响应速度。
- **Claude** と **Ollama** モデルのサポートを追加しました。
- 大規模かつ複雑な diff の処理を改善し、コミットメッセージの品質を向上しました。
- 各 AI サービス間での Provider 切り替えの安定性とスムーズさを向上しました。
- モデル設定と構成フローを改善し、Claude/Ollama のセットアップ体験を向上しました。
- エッジケースでの生成失敗を減らし、フォールバック挙動を改善しました。
- 生成時の全体的な安定性と応答性を強化しました。
- Unterstützung für **Claude**- und **Ollama**-Modelle hinzugefügt.
- Die Verarbeitung großer und komplexer Diffs verbessert, um die Qualität der Commit-Messages zu erhöhen.
- Das Umschalten zwischen verschiedenen KI-Diensten robuster und flüssiger gemacht.
- Modell-Einstellungen und Konfigurationsablauf verbessert, einschließlich einer besseren Einrichtung für Claude/Ollama.
- Generierungsfehler in Randfällen reduziert und das Fallback-Verhalten verbessert.
- Die allgemeine Stabilität und Reaktionsfähigkeit während der Generierung verbessert.

## [3.4.0] - 2025-12-30

- **New UI Design** - Redesigned tool window interface with improved user experience
- **Recent Commit Context** - Automatically references recent commit history when generating commit messages for better consistency
- **Improved Settings Interface** - Enhanced settings page layout and interactions
- **Theme Support** - Added light and dark theme support that automatically adapts to IDE theme
- **Enhanced Prompt Templates** - Improved template management with better save and quick-switch capabilities
- **Better Token Verification** - Clearer verification flow with more helpful error messages

## [3.3.0] - 2025-09-26

- Faster, more reliable switching across AI providers.
- Commit editor now guards against double submissions and jumps back to editing the moment generation finishes.
- Token prompts are simpler and clearer so you can fix credentials quickly.
- Long-diff suggestions stay accurate thanks to smarter token handling.
- Overall stability and performance feel tighter across the board.

## [3.2.7] - 2025-09-20

- Fix 🌐: Resolved OpenAI API path concatenation issue 🛠️✨

### Latest Updates

- Faster, more responsive AI suggestions for a smoother writing flow.
- Improved commit editor experience: subtle dim effect during generation.
- Smoother incremental updates to generated commit messages.
- Smarter defaults and curated models for better results out of the box.
- Overall polish with improved performance and stability.

## [3.2.6] - 2025-09-15

- Faster, more responsive AI suggestions for a smoother writing flow.
- Improved commit editor experience: subtle dim effect during generation.
- Smoother incremental updates to generated commit messages.
- Smarter defaults and curated models for better results out of the box.
- Overall polish with improved performance and stability.

## [3.2.4] - 2025-04-06

- Support for OpenAI models: `o1`, `o1-mini`, `o3-mini`, `chatgpt-4o-latest`
- Support for Gemini models: `gemini-2.0-flash-exp`, `gemini-2.0-flash`, `gemini-2.0-flash-lite-preview-02-05`, `gemini-2.5-pro-exp-03-25`
- Introduced a running state icon.

## [3.2.3] - 2025-04-06

- Support for OpenAI models: `o1`, `o1-mini`, `o3-mini`, `chatgpt-4o-latest`
- Support for Gemini models: `gemini-2.0-flash-exp`, `gemini-2.0-flash`, `gemini-2.0-flash-lite-preview-02-05`, `gemini-2.5-pro-exp-03-25`
- Introduced a running state icon.

## [3.2.2] - 2025-03-30

- Support for OpenAI models: `o1`, `o1-mini`, `o3-mini`, `chatgpt-4o-latest`
- Support for Gemini models: `gemini-2.0-flash-exp`, `gemini-2.0-flash`, `gemini-2.0-flash-lite-preview-02-05`, `gemini-2.5-pro-exp-03-25`

## [3.2.1] - 2024-12-28

- Support Gemini 2.0 model: [Gemini 2.0 Flash](https://ai.google.dev/gemini-api/docs/models/gemini?hl=zh-cn#gemini-2.0-flash) and [Gemini 1.5 Flash-8B](https://ai.google.dev/gemini-api/docs/models/gemini?hl=zh-cn#gemini-1.5-flash-8b)
- Fix Gemini request issues.

## [3.2.0] - 2024-11-27

### Features

- Made compatible with RustRover and more IDEs.
- Optimized the Diff algorithm.
- Enhanced the extraction ability of files not tracked by the version system.

## [3.1.2] - 2024-10-27

### Bug Fixes

- Minor bug fixes and optimizations for a smoother experience.

## [3.1.0] - 2024-07-28

### New Features

- **Enhanced Pin Handling**: Improved the way pin handling works in AICommitDialog for a smoother experience.

### Bug Fixes and Improvements

- **Stability Enhancements**: Various under-the-hood improvements to increase overall stability and performance.  [#20](https://github.com/AICommitApp/community/issues/20)

## [3.0.9] - 2024-07-21

- Added support for new model variants, including GPT-4o mini and Gemini 1.5 flash
- Improved encoding logic.

## [3.0.8] - 2024-05-28

- Fix compatibility issues. (https://github.com/AICommitApp/community/issues/19)

### Recent Updates

- - Experience the power of the latest GPT-4o model in our plugin, offering unparalleled performance and user experience.
- - We've streamlined the list of OpenAI models to make it easier for you to choose the best option for your needs.
- - Introducing support for the Gemini 1.5 Pro model, expanding the capabilities and options available within our plugin.

### Improvements

- Various stability improvements to enhance overall plugin performance and reliability.

### Bug Fixes

- Minor bug fixes and optimizations for a smoother experience.

## [3.0.7] - 2024-05-14

### New Features

- - Experience the power of the latest GPT-4o model in our plugin, offering unparalleled performance and user experience.
- - We've streamlined the list of OpenAI models to make it easier for you to choose the best option for your needs.
- - Introducing support for the Gemini 1.5 Pro model, expanding the capabilities and options available within our plugin.

### Improvements

- Various stability improvements to enhance overall plugin performance and reliability.

### Bug Fixes

- Minor bug fixes and optimizations for a smoother experience.

## [3.0.5] - 2024-05-07

- Fix  CJK garbled characters. #13

## [3.0.4] - 2024-04-27

- Simplify verify process to support custom domain.
- Improve the perfomance of tokenization.

## [3.0.3] - 2024-03-16

- Fix emoji not working in Prompt

## [2.2.6] - 2023-11-11

## [2.2.3] - 2023-10-19

- Bug fixes and improvements
- Rate Limit control is temporarily hidden and will be relaunched when it is improved.

## [2.2.2] - 2023-07-31

- Bug fixes and improvements

## [2.2.1] - 2023-06-15

- Support `gpt-3.5-turbo-16k`, `gpt-4-0613` and `gpt-4-32k-0613`.

## [2.1.4] - 2023-05-28

- :zap: We've optimized our token computation logic, reducing the chances of hitting token limits! Keep up the good work without interruptions. :muscle:
- :detective: Enhanced our diff content evaluation logic. :rocket:

## [2.1.3] - 2023-05-03

- 🌟 Support for GPT-4 models! This brings more token caps and better context capabilities, and we strongly recommend using the GPT-4 model first.
- 🐛 Stability enhancements and bug fixes.

## [2.1.2] - 2023-04-13

- 🌟 Support for custom domain names is available to prevent OpenAI's domain name from being blocked in certain regions. You can customize your domain name in the Settings (Tools --> AI Commit).
- Optimize the token verification process on the settings page.

## [2.1.1] - 2023-04-11

## [2.1.0] - 2023-04-10

- 🚀 Introducing the brand-new "Ask Anything" feature, offering a Cursor-like code generation and editing experience within JetBrains.
- 🚀 Introducing temporary chat mode feature, which allows you to chat with GPT in the toolWindow instead of generating commit messages.
- 🐛 Fixed an issue where network connection errors were not displayed.
- 🐛 Resolved the problem of not being able to pause commit message generation.
- 🐛 Fix OpenAI API charset error.
- 🌐 Localization improvements.

## [2.0.0] - 2023-04-09

- 🚀 Introducing the brand-new "Ask Anything" feature, offering a Cursor-like code generation and editing experience within JetBrains.
- 🐛 Fixed an issue where network connection errors were not displayed.
- 🐛 Resolved the problem of not being able to pause commit message generation.
- 🌐 Localization improvements.

## [1.2.4] - 2023-04-07

- Stability improvement.

## [1.2.3] - 2023-04-06

- Fix the problem that the token cannot be verified in the settings
- Fix the issue of failing to obtain locally saved tokens in certain situations. This update requires you to re-enter your token, we apologize for the inconvenience and thank you for your understanding.

## [1.2.1] - 2023-04-03

- Resolve token verification logic errors;
- Other error fixes and stability improvements.

## [1.2.0] - 2023-04-02

- Added support for the 213.+ platform.
- Stability improvement.

## [1.1.4] - 2023-03-29

- fix: Removing Git Repository Validation. by @rosuH

## [1.1.3] - 2023-03-29

- - Update plugin's supported build versions to 223.* - 2023.1 by @rosuH
- - Update pluginUntilBuild version in gradle.properties by @rosuH
- - Update pluginVersion to 1.1.3 in gradle.properties. by @rosuH

## [1.1.1] - 2023-03-26

- 🔖 1.1.1 by @rosuH in https://github.com/rosuH/AICommit/pull/3
- Remove Qodana inspection step from build.yml. by @rosuH in https://github.com/rosuH/AICommit/pull/4

## [0.0.1] - 2023-03-12

### Added

- Initial scaffold created from [IntelliJ Platform Plugin Template](https://github.com/JetBrains/intellij-platform-plugin-template)
- Generating commit messages using OpenAI
- Supporting custom prompts and various parameter adjustments
- Support for Translations
- Support for Rate Limiting
- Support for Commit Message Templates(Order List for now)

[Unreleased]: https://github.com/AICommitApp/community/issues/compare/v3.7.0...HEAD
[3.7.0]: https://github.com/AICommitApp/community/issues/compare/v3.6.1...v3.7.0
[3.6.1]: https://github.com/AICommitApp/community/issues/compare/v3.6.0...v3.6.1
[3.6.0]: https://github.com/AICommitApp/community/issues/compare/v3.5.1...v3.6.0
[3.5.1]: https://github.com/AICommitApp/community/issues/compare/v3.5.0...v3.5.1
[3.5.0]: https://github.com/AICommitApp/community/issues/compare/v3.4.4...v3.5.0
[3.4.4]: https://github.com/AICommitApp/community/issues/compare/v3.4.3...v3.4.4
[3.4.3]: https://github.com/AICommitApp/community/issues/compare/v3.4.2...v3.4.3
[3.4.2]: https://github.com/AICommitApp/community/issues/compare/v3.4.1...v3.4.2
[3.4.1]: https://github.com/AICommitApp/community/issues/compare/v3.4.0...v3.4.1
[3.4.0]: https://github.com/AICommitApp/community/issues/compare/v3.3.0...v3.4.0
[3.3.0]: https://github.com/AICommitApp/community/issues/compare/v3.2.7...v3.3.0
[3.2.7]: https://github.com/AICommitApp/community/issues/compare/v3.2.6...v3.2.7
[3.2.6]: https://github.com/AICommitApp/community/issues/compare/v3.2.4...v3.2.6
[3.2.4]: https://github.com/AICommitApp/community/issues/compare/v3.2.3...v3.2.4
[3.2.3]: https://github.com/AICommitApp/community/issues/compare/v3.2.2...v3.2.3
[3.2.2]: https://github.com/AICommitApp/community/issues/compare/v3.2.1...v3.2.2
[3.2.1]: https://github.com/AICommitApp/community/issues/compare/v3.2.0...v3.2.1
[3.2.0]: https://github.com/AICommitApp/community/issues/compare/v3.1.2...v3.2.0
[3.1.2]: https://github.com/AICommitApp/community/issues/compare/v3.1.0...v3.1.2
[3.1.0]: https://github.com/AICommitApp/community/issues/compare/v3.0.9...v3.1.0
[3.0.9]: https://github.com/AICommitApp/community/issues/compare/v3.0.8...v3.0.9
[3.0.8]: https://github.com/AICommitApp/community/issues/compare/v3.0.7...v3.0.8
[3.0.7]: https://github.com/AICommitApp/community/issues/compare/v3.0.5...v3.0.7
[3.0.5]: https://github.com/AICommitApp/community/issues/compare/v3.0.4...v3.0.5
[3.0.4]: https://github.com/AICommitApp/community/issues/compare/v3.0.3...v3.0.4
[3.0.3]: https://github.com/AICommitApp/community/issues/compare/v2.2.6...v3.0.3
[2.2.6]: https://github.com/AICommitApp/community/issues/compare/v2.2.3...v2.2.6
[2.2.3]: https://github.com/AICommitApp/community/issues/compare/v2.2.2...v2.2.3
[2.2.2]: https://github.com/AICommitApp/community/issues/compare/v2.2.1...v2.2.2
[2.2.1]: https://github.com/AICommitApp/community/issues/compare/v2.1.4...v2.2.1
[2.1.4]: https://github.com/AICommitApp/community/issues/compare/v2.1.3...v2.1.4
[2.1.3]: https://github.com/AICommitApp/community/issues/compare/v2.1.2...v2.1.3
[2.1.2]: https://github.com/AICommitApp/community/issues/compare/v2.1.1...v2.1.2
[2.1.1]: https://github.com/AICommitApp/community/issues/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/AICommitApp/community/issues/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/AICommitApp/community/issues/compare/v1.2.4...v2.0.0
[1.2.4]: https://github.com/AICommitApp/community/issues/compare/v1.2.3...v1.2.4
[1.2.3]: https://github.com/AICommitApp/community/issues/compare/v1.2.1...v1.2.3
[1.2.1]: https://github.com/AICommitApp/community/issues/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/AICommitApp/community/issues/compare/v1.1.4...v1.2.0
[1.1.4]: https://github.com/AICommitApp/community/issues/compare/v1.1.3...v1.1.4
[1.1.3]: https://github.com/AICommitApp/community/issues/compare/v1.1.1...v1.1.3
[1.1.1]: https://github.com/AICommitApp/community/issues/compare/v0.0.1...v1.1.1
[0.0.1]: https://github.com/AICommitApp/community/issues/commits/v0.0.1
