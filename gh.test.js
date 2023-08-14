let page;

describe("Github page tests", () => { // блок describe, для которого будут работать хуки 
  
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  });
  
  afterEach(() => {
    page.close();
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    await new Promise(res => setTimeout(res, 5000));
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Let’s build from here · GitHub');
  }, 10000);

  test("The first link attribute", async () => {
    await new Promise(res => setTimeout(res, 5000));
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 10000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await new Promise(res => setTimeout(res, 5000));
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  }, 10000);
});

beforeEach(async () => { // глобальный хук для открытия страницы
  page = await browser.newPage();
});

afterEach(() => { // глобальный хук для закрытия страницы
  page.close();
});

test("GitHub Co-pilot page - h1 header content", async () => { // первый тест вне describe
  
  // повторявшиеся строки вынесены в хуки
  await page.goto("https://github.com/features/copilot");
  await page.waitForSelector("div[data-hpc] h1");
  const firstHeader = await page.$eval("div[data-hpc] h1", headerText => headerText.textContent);
  expect(firstHeader).toEqual("Your AI pair programmer");
})

test("GitHub Login page - h1 header content", async () => { // второй тест вне describe
  
  // повторявшиеся строки вынесены в хуки
  await page.goto("https://github.com/login");
  await page.waitForSelector("div.auth-form-header h1");
  const firstHeader = await page.$eval("div.auth-form-header h1", headerText => headerText.textContent);
  expect(firstHeader).toEqual("Sign in to GitHub");
})

test("GitHub Pricing page - h1 header content", async () => { // третий тест вне describe
  
  // повторявшиеся строки вынесены в хуки
  await page.goto("https://github.com/pricing");
  await page.waitForSelector("div h1.h2-mktg");
  const firstHeader = await page.$eval("div h1.h2-mktg", headerText => headerText.textContent);
  expect(firstHeader).toEqual("Get the complete developer" + String.fromCharCode(160) + "platform.");
})

  
