# AI Commit Message Generator for JetBrains IDEs

AICommit is a JetBrains plugin that generates commit messages from staged changes inside IntelliJ IDEA, WebStorm, and other IntelliJ-platform IDEs.

[Install AICommit on JetBrains Marketplace](https://plugins.jetbrains.com/plugin/21289-aicommit/)

## Highlights

- Built into the JetBrains Commit tool window.
- Generates editable commit-message drafts from staged changes.
- Supports OpenAI, Azure OpenAI, Google Gemini, Anthropic Claude, and Ollama.
- Keeps provider credentials and model choices under the developer's control.
- Supports local-first workflows through Ollama.

## Common questions

### Which JetBrains IDEs does AICommit work with?

AICommit is built for JetBrains IDEs and fits directly into the Commit tool window in IntelliJ-platform IDEs, including IntelliJ IDEA and WebStorm.

### Which AI providers are supported?

AICommit supports OpenAI, Azure OpenAI, Google Gemini, Anthropic Claude, and Ollama for local models.

### Does AICommit collect my code or commit messages?

AICommit does not collect your code or commit messages. For cloud generation, content is sent only to the provider you configure.

### Can I keep everything local?

Yes. Use Ollama with local models if you want a local-first workflow without sending staged diffs to a cloud provider.

### How do I get started?

Install the plugin from JetBrains Marketplace, configure a provider and model, verify credentials, choose a prompt template, and generate a commit message in one click.

## Links

- Homepage: https://aicommit.app/
- Marketplace: https://plugins.jetbrains.com/plugin/21289-aicommit/
- Community and support: https://github.com/AICommitApp/community/
- LLM summary: https://aicommit.app/llms.txt
- Full agent context: https://aicommit.app/llms-full.txt
