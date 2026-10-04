/* Team data and portraits live in data/team.json; no HTML editing required. */
(async () => {
  'use strict';
  const { readResource, element, showError, localImage, safeLink } = window.HARD;
  const container = document.querySelector('#team-grid');
  try {
    const members = await readResource('data/team.json', true);
    container.replaceChildren();
    members.forEach(member => {
      const card = element('article', 'team-card reveal');
      card.dataset.member = member.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const portrait = element('div', 'portrait');
      const image = localImage(member.photo, `${member.name} — team portrait`);
      image.loading = 'eager';
      portrait.append(image);
      card.append(portrait, element('h2', '', member.name), element('p', 'eyebrow', member.role));
      const url = safeLink(member.linkedin);
      if (url) {
        const link = element('a', 'profile-link arrow-link', 'LinkedIn');
        link.href = url;
        link.setAttribute('aria-label', `${member.name} on LinkedIn`);
        card.append(link);
      }
      container.append(card);
    });
    if (!members.length) container.append(element('p', 'muted', 'Team updates are coming soon.'));
    container.setAttribute('aria-busy', 'false');
    document.dispatchEvent(new Event('hard:content'));
  } catch (error) {
    showError(container, error);
    container.setAttribute('aria-busy', 'false');
  }
})();
