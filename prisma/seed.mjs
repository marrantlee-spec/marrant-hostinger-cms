import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password || password.length < 12) {
    throw new Error("请先设置 ADMIN_EMAIL，以及至少 12 个字符的 ADMIN_PASSWORD。");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });

  await prisma.category.createMany({
    data: [
      { name: "Leather Handbags", slug: "leather-handbags", type: "PRODUCT" },
      { name: "Leather Wallets", slug: "leather-wallets", type: "PRODUCT" },
      { name: "Travel Bags", slug: "travel-bags", type: "PRODUCT" },
      { name: "Sourcing Guides", slug: "sourcing-guides", type: "BLOG" },
      { name: "Leather & Materials", slug: "leather-and-materials", type: "BLOG" },
      { name: "OEM/ODM Guides", slug: "oem-odm-guides", type: "BLOG" },
    ],
    skipDuplicates: true,
  });

  console.log(`管理员账号已就绪：${email}`);
}

main()
  .finally(() => prisma.$disconnect())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
