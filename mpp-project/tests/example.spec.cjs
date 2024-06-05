const { test, expect } = require('@playwright/test');


test('read page', async ({ page }) => {
  await page.goto('http://localhost:5173/read/1');
  await page
  expect(await page.textContent('text=Frozen yoghurt')).toBe('Frozen yoghurt');
  expect(await page.textContent('text=130')).toBe('130');
  expect(await page.textContent('text=45')).toBe('45');
  expect(await page.textContent('text=2')).toBe('2');
  expect(await page.textContent('text=90')).toBe('90');
});

test('delete button', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page
  await page.getByRole('button', { name: 'Delete' }).first().click();
  page.on('dialog', async dialog => {
    await dialog.accept();
  });
  //expect the page to be the same url
  await expect(page.url()).toBe('http://localhost:5173/');
  // const wholePage = await page.locator('body')
  // await expect(wholePage).not.toContainText('Frozen yoghurt')
});

test('create new element', async ({ page }) => {
  await page.goto('http://localhost:5173/create');
  await page.fill('input[name="name"]', 'New Element');
  await page.fill('input[name="calories"]', '130');
  await page.fill('input[name="fat"]', '45');
  await page.fill('input[name="carbs"]', '2');
  await page.fill('input[name="protein"]', '90');
  await page.click('text=Submit');
  expect(await page.textContent('text=New Element')).toBe('New Element');
}
);

//test update page
test('update page', async ({ page }) => {
  await page.goto('http://localhost:5173/update/bd17');
  await page.fill('input[name="name"]', 'Updated Element');
  await page.fill('input[name="calories"]', '130');
  await page.fill('input[name="fat"]', '45');
  await page.fill('input[name="carbs"]', '2');
  await page.fill('input[name="protein"]', '90');
  await page.click('text=Update');
  expect(await page.textContent('text=Updated Element')).toBe('Updated Element');
  expect(await page.textContent('text=130')).toBe('130');
  expect(await page.textContent('text=45')).toBe('45');
  expect(await page.textContent('text=2')).toBe('2');
  expect(await page.textContent('text="90"')).toBe('90');
});


test('update page2', async ({ page }) => {
  await page.goto('http://localhost:5173/update/bd17');
  await page.fill('input[name="name"]', 'Frozen yoghurt');
  await page.fill('input[name="calories"]', '130');
  await page.fill('input[name="fat"]', '45');
  await page.fill('input[name="carbs"]', '2');
  await page.fill('input[name="protein"]', '90');
  await page.click('text=Update');
  expect(await page.textContent('text=Frozen yoghurt')).toBe('Frozen yoghurt');
  expect(await page.textContent('text=130')).toBe('130');
  expect(await page.textContent('text=45')).toBe('45');
  expect(await page.textContent('text=2')).toBe('2');
  expect(await page.textContent('text="90"')).toBe('90');
});





