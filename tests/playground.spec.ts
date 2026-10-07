import { test, expect } from '@playwright/test';

test('simple heading and keyboard movement work without browser errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'YAMAMOTO ERINA', exact: true })).toBeVisible();
  await expect(page.locator('.bubble')).toHaveCount(18);
  await expect(page.locator('#hero-title .name-line')).toHaveText(['YAMAMOTO', 'ERINA']);
  await expect(page.locator('.play-controls')).toHaveCount(0);
  const bubble = page.locator('.bubble').first();
  const before = (await bubble.boundingBox())!;
  await bubble.focus();
  await page.keyboard.press('ArrowRight');
  expect(((await bubble.boundingBox())!).x).toBeCloseTo(before.x + 24, 0);
  expect(errors).toEqual([]);
  await page.screenshot({ path: 'test-results/desktop.png', fullPage: true });
});

test('dragging throws a bubble, works navigation and legacy assets are available', async ({ page }) => {
  await page.goto('/');
  const bubble = page.locator('.bubble').first();
  const box = (await bubble.boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 + 95, box.y + box.height / 2 + 30, { steps: 5 });
  await page.mouse.up();
  const released = await bubble.getAttribute('style');
  await page.waitForTimeout(150);
  expect(await bubble.getAttribute('style')).not.toBe(released);
  await page.getByRole('link', { name: 'WORKS', exact: true }).click();
  await expect(page).toHaveURL(/#area04$/);
  for (const path of ['/work/01.html', '/work/css/work.css', '/common/js/import.js', '/img/img_work_01.jpg']) {
    expect((await page.request.get(path)).ok()).toBeTruthy();
  }
});

test('mobile layout fits and touch can move a bubble', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  const bubble = page.locator('.bubble').first();
  const box = (await bubble.boundingBox())!;
  const session = await context.newCDPSession(page);
  const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [point] });
  await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: point.x + 40, y: point.y + 15 }] });
  await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  expect(((await bubble.boundingBox())!).x).toBeCloseTo(box.x + 40, 0);
  await expect(page.locator('#hero-title')).toBeVisible();
  await page.screenshot({ path: 'test-results/mobile.png', fullPage: true });
  await context.close();
});

test('letters hover independently and sections snap to the viewport', async ({ page }) => {
  await page.goto('/');
  const letters = page.locator('.name-letter');
  await expect(letters).toHaveCount(13);
  await letters.first().hover();
  await expect.poll(() => letters.first().evaluate(el => getComputedStyle(el).transform)).not.toBe('none');
  expect(await letters.nth(1).evaluate(el => getComputedStyle(el).transform)).toBe('none');
  for (const id of ['area02', 'area03', 'area04', 'area05']) {
    expect(await page.locator(`#${id}`).evaluate(el => el.getBoundingClientRect().height >= innerHeight)).toBeTruthy();
  }
  await page.getByRole('link', { name: 'SKILL', exact: true }).click();
  await expect.poll(() => page.locator('#area03').evaluate(el => Math.abs(el.getBoundingClientRect().top))).toBeLessThan(2);
  await page.mouse.move(15, 350);
  await page.mouse.wheel(0, 500);
  await expect.poll(() => page.locator('#area04').evaluate(el => Math.abs(el.getBoundingClientRect().top))).toBeLessThan(2);
});

test('bubbles keep drifting without interaction', async ({ page }) => {
  await page.goto('/');
  const bubble = page.locator('.bubble').first();
  const initial = await bubble.getAttribute('style');
  await expect.poll(() => bubble.getAttribute('style')).not.toBe(initial);
});

test('React renders profile, skills, works and contact including direct section links', async ({ page }) => {
  await page.goto('/index.html#area03');
  await expect(page.locator('#area02 h3')).toHaveText('山本 絵梨奈');
  await expect(page.locator('#area03 .skill-row')).toHaveCount(3);
  await expect(page.locator('#area03 .skill-row').last()).toContainText('React');
  await expect(page.locator('#area03 .skill-learning')).toHaveText('挑戦中');
  await expect(page.locator('#area04 li')).toHaveCount(6);
  await expect(page.locator('#area05 a')).toHaveAttribute('href', /^mailto:/);
  await expect.poll(() => page.locator('#area03').evaluate(el => Math.abs(el.getBoundingClientRect().top))).toBeLessThan(2);
  for (const img of await page.locator('#area04 img').all()) {
    await expect.poll(() => img.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  const background = await page.locator('.circle').evaluate(el => getComputedStyle(el).backgroundImage);
  expect(background).toContain('profile-portrait');
});
