import asyncio
import os
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1920, "height": 1080})
        page = await context.new_page()
        print("Navigating to page...")
        await page.goto("https://phapluat.gov.vn/nghi-quyet-66?tab=ban-chi-dao", wait_until="networkidle")
        await page.wait_for_selector("#rc-tabs-0-tab-ban-chi-dao")
        await page.click("#rc-tabs-0-tab-ban-chi-dao")
        print("Waiting for members to load...")
        await page.wait_for_timeout(5000)
        for i in range(12):
            await page.evaluate("window.scrollBy(0, 800)")
            await page.wait_for_timeout(1500)
        await page.evaluate("window.scrollTo(0, 0)")
        await page.wait_for_timeout(2000)
        container = await page.query_selector("#rc-tabs-0-panel-ban-chi-dao")
        if not container:
            container = await page.query_selector(".ant-tabs-content")
        if container:
            html = await container.outer_html()
            output_dir = r"d:\CPLQG\CPLQG-Template"
            os.makedirs(output_dir, exist_ok=True)
            output_path = os.path.join(output_dir, "phapluat_nq66_dynamic.html")
            with open(output_path, "w", encoding="utf-8") as f:
                f.write(html)
            print(f"Successfully extracted and saved HTML to {output_path}")
        else:
            print("Container not found!")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
