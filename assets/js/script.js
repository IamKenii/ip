window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

async function loadRepos() {
  const container = document.getElementById('github-repos');
  try {
    const res = await fetch('https://api.github.com/users/IamKeni/repos?sort=updated&per_page=12');
    const repos = await res.json();
    if (!Array.isArray(repos) || repos.length === 0) {
      container.innerHTML = '<div class="github-loading">Nog geen publieke repositories.</div>';
      return;
    }
    const filtered = repos.filter(r => !r.fork).slice(0, 9);
    if (filtered.length === 0) {
      container.innerHTML = '<div class="github-loading">Nog geen eigen publieke repositories. <a href="https://github.com/IamKeni" target="_blank" style="color:var(--accent)">Bekijk GitHub →</a></div>';
      return;
    }
    container.innerHTML = filtered.map(r => `
      <a class="repo-card" href="${r.html_url}" target="_blank" rel="noopener">
        <div class="repo-name">${r.name}</div>
        <div class="repo-desc">${r.description || '—'}</div>
        <div class="repo-meta">
          ${r.language ? `<span class="repo-lang">${r.language}</span>` : ''}
          ${r.stargazers_count > 0 ? `<span class="repo-stars">★ ${r.stargazers_count}</span>` : ''}
          <span class="repo-badge">Bekijk →</span>
        </div>
      </a>
    `).join('');
  } catch (e) {
    container.innerHTML = `<div class="github-loading">Kon repositories niet laden. <a href="https://github.com/IamKeni" target="_blank" style="color:var(--accent)">Bekijk GitHub direct →</a></div>`;
  }
}

loadRepos();
