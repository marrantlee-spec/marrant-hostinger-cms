"use client";

import { FormEvent, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChatCircleDots,
  CheckCircle,
  ClipboardText,
  Factory,
  GlobeHemisphereWest,
  Lightbulb,
  Package,
  PencilSimple,
  ShieldCheck,
  Swatches,
  Tag,
  WhatsappLogo,
} from "@phosphor-icons/react";
import InternalLinkPanel from "./InternalLinkPanel";
import { contactEmail, contactEmailHref } from "./contact-details";
import { submitInquiry } from "./submitInquiry";

const whatsapp = "https://wa.me/8618925073489";
const imageBase = "/assets/products/mens-bifold-wallet-8064";

type Locale = "en" | "zh";
type FormStatus = { tone: "success" | "error"; message: string } | null;
type WalletOption = readonly [name: string, color: string, image?: string];

const content = {
  en: {
    home: "Home",
    products: "Products",
    category: "Wallets & Small Leather Goods",
    name: "Men's Full-Grain Leather Bifold Wallet",
    kicker: "Men's Leather Wallet · SKU 8064",
    title: <>Full-Grain Leather<br />Bifold Wallet</>,
    intro: "A compact men's bifold wallet in full-grain cowhide, with a practical card-and-cash layout and customizable branding, color, hardware, lining and packaging.",
    request: "Request Specification",
    chat: "Chat with our team",
    galleryLabel: "Product image gallery",
    showImage: "Show image",
    factsLabel: "Product information overview",
    facts: [
      ["SKU", "8064"],
      ["Material", "Full-grain cowhide"],
      ["Dimensions", "12 × 2 × 10 cm"],
      ["Style", "Men's bifold wallet"],
      ["Colors", "5 listed options"],
      ["Customization", "Logo, color & details"],
      ["MOQ", "To be confirmed"],
    ],
    specifications: "Product Specifications",
    specNote: "Specifications shown are based on the supplied product information and images. MOQ and lead times are confirmed against the final customization brief.",
    specs: [
      { left: ["SKU", "8064"], right: ["Style", "Men's bifold wallet"] },
      { left: ["Dimensions", "12 × 2 × 10 cm"], right: ["Material", "Full-grain cowhide leather"] },
      { left: ["Construction", "Bifold"], right: ["Colors", "Black / Brown / Red Brown / Coffee / Oil Coffee"] },
      { left: ["Interior", "Card slots and zip compartment shown"], right: ["Lining", "Customizable"] },
      { left: ["Hardware", "Customizable"], right: ["Logo", "Customizable"] },
      { left: ["Packaging", "Customizable"], right: ["MOQ", "To be confirmed"] },
      { left: ["Sample Lead Time", "To be confirmed"], right: ["Production Lead Time", "To be confirmed"] },
    ],
    materialTitle: "Material",
    materialName: "Full-Grain Cowhide",
    materialCopy: "A natural leather surface with visible grain and tonal variation. Final leather selection, thickness and finish are confirmed during sampling.",
    colorsTitle: "Listed Colors",
    colorsCopy: "Color matching and additional options can be evaluated for your order.",
    customizationTitle: "OEM / ODM Customization",
    packagingTitle: "Packaging Options",
    processTitle: "Order Process",
    factoryKicker: "Visit Marrant",
    factoryTitle: "Review Materials and Workmanship in Person",
    factoryCopy: "Brand teams, importers and product developers are welcome to review leather selection, cutting, stitching, assembly and quality checks at our Guangzhou facility.",
    factoryPoints: ["Owner-led factory visit", "Review wallet construction", "Discuss your OEM / ODM brief"],
    factoryCta: "Plan a Factory Visit",
    faqTitle: "Frequently Asked Questions",
    faqs: [
      ["What is the MOQ for SKU 8064?", "MOQ is still to be confirmed. It depends on the selected leather, color, logo method, packaging and order requirements."],
      ["Can the interior layout be changed?", "Yes. Share the card-slot, cash-compartment and coin-pocket layout you need, and we will evaluate it during product development."],
      ["Which colors are available?", "The supplied options are black, brown, red brown, coffee and oil coffee. Final color standards are confirmed before sampling."],
      ["Can we add our logo and branded packaging?", "Yes. Logo treatment and packaging can be developed to your brief after the artwork and order requirements are reviewed."],
      ["How long do samples and production take?", "Both schedules are currently to be confirmed and will be quoted after the materials and customization details are finalized."],
    ],
    inquiryTitle: "Submit an Inquiry",
    inquiryCopy: "Tell us your quantity, market and customization requirements for SKU 8064.",
    form: {
      name: "Your Name *", company: "Company Name", email: "Email *", phone: "Phone *", country: "Country / Region",
      product: "Product Interest", quantity: "Estimated Order Quantity", message: "Message *", privacy: "I agree to the Privacy Policy.",
      submit: "Submit Inquiry", sending: "Sending…",
      success: "Thank you. Your inquiry has been sent and our team will reply within one business day.",
      error: "We could not send your inquiry. Please try again or contact us by email.",
    },
    partnerTitle: "Why Partner with Marrant?",
    partnerPoints: ["Leather goods development and manufacturing", "Flexible customization for global markets", "Quality control throughout production", "Support from inquiry to after-sales"],
    contactTitle: "Contact Information",
    linksTitle: "Continue planning your collection",
    linksCopy: "Compare this wallet with our wider product range, manufacturing capabilities and sourcing guidance.",
    links: [
      { href: "/products", label: "Browse all collections", description: "Compare wallets, travel bags, backpacks and other leather goods." },
      { href: "/about#production", label: "See our production", description: "Understand the process and quality checkpoints behind an order." },
      { href: "/blog", label: "Read sourcing insights", description: "Prepare materials, construction and supplier requirements." },
      { href: "/contact#inquiry", label: "Start an inquiry", description: "Send your quantity, market and customization needs." },
    ],
  },
  zh: {
    home: "首页",
    products: "产品系列",
    category: "钱包与小皮具",
    name: "男士头层牛皮二折钱包",
    kicker: "男士真皮钱包 · SKU 8064",
    title: <>头层牛皮<br />男士二折钱包</>,
    intro: "采用头层牛皮制作的男士二折钱包，兼顾卡片、现金与拉链收纳，并支持标识、颜色、五金、内衬及包装定制。",
    request: "获取产品规格",
    chat: "联系定制团队",
    galleryLabel: "产品图片展示",
    showImage: "查看图片",
    factsLabel: "产品信息概览",
    facts: [
      ["产品编号", "8064"],
      ["材质", "头层牛皮"],
      ["尺寸", "12 × 2 × 10 cm"],
      ["款式", "男士二折钱包"],
      ["颜色", "5 种现有选项"],
      ["定制", "标识、颜色与细节"],
      ["MOQ", "根据需求确认"],
    ],
    specifications: "产品规格",
    specNote: "以上规格根据已提供的产品资料及图片整理；MOQ、打样周期及大货周期需结合最终定制方案确认。",
    specs: [
      { left: ["产品编号", "8064"], right: ["款式", "男士二折钱包"] },
      { left: ["尺寸", "12 × 2 × 10 cm"], right: ["材质", "头层牛皮"] },
      { left: ["结构", "二折式"], right: ["颜色", "黑色 / 棕色 / 红棕色 / 咖啡色 / 油咖啡色"] },
      { left: ["内部结构", "图片展示卡位与拉链位"], right: ["内衬", "可定制"] },
      { left: ["五金", "可定制"], right: ["品牌标识", "可定制"] },
      { left: ["包装", "可定制"], right: ["MOQ", "根据需求确认"] },
      { left: ["打样周期", "根据需求确认"], right: ["大货周期", "根据需求确认"] },
    ],
    materialTitle: "材料说明",
    materialName: "头层牛皮",
    materialCopy: "保留自然皮纹与色泽变化。具体皮料、厚度及表面处理将在打样阶段根据订单要求确认。",
    colorsTitle: "现有颜色",
    colorsCopy: "可结合订单数量评估颜色匹配及其他颜色开发。",
    customizationTitle: "OEM / ODM 定制",
    packagingTitle: "包装选项",
    processTitle: "订单流程",
    factoryKicker: "到访玛轮特",
    factoryTitle: "实地确认材料与制作工艺",
    factoryCopy: "欢迎品牌团队、进口商与产品开发人员到访广州，了解皮料选配、裁切、缝制、装配与品质检验。",
    factoryPoints: ["工厂负责人接待交流", "查看钱包结构与工艺", "沟通 OEM / ODM 定制需求"],
    factoryCta: "预约工厂参观",
    faqTitle: "常见采购问题",
    faqs: [
      ["8064 的起订量是多少？", "起订量暂未确认，需要结合皮料、颜色、标识工艺、包装和订单要求核算。"],
      ["可以调整内部结构吗？", "可以。请提供需要的卡位、现金位与零钱位结构，我们将在产品开发阶段评估。"],
      ["有哪些颜色可以选择？", "当前资料列出的颜色为黑色、棕色、红棕色、咖啡色与油咖啡色，最终色板需在打样前确认。"],
      ["可以定制品牌标识和包装吗？", "可以。收到品牌图稿及订单要求后，我们将评估适用的标识工艺与包装方案。"],
      ["打样和大货生产需要多久？", "目前均为待确认状态，将在皮料与定制细节确定后提供时间安排。"],
    ],
    inquiryTitle: "提交采购需求",
    inquiryCopy: "请提供 SKU 8064 的预计数量、目标市场与定制要求。",
    form: {
      name: "姓名 *", company: "公司名称", email: "电子邮箱 *", phone: "联系电话 *", country: "国家 / 地区",
      product: "意向产品", quantity: "预计采购数量", message: "需求说明 *", privacy: "我同意将以上信息用于本次采购咨询。",
      submit: "提交采购需求", sending: "正在发送…",
      success: "提交成功，我们将在一个工作日内回复。",
      error: "暂时无法发送，请稍后重试或直接通过邮箱联系我们。",
    },
    partnerTitle: "为什么选择玛轮特？",
    partnerPoints: ["专注真皮产品开发与制造", "面向不同市场提供灵活定制", "生产过程中的品质管控", "从需求沟通到售后持续跟进"],
    contactTitle: "联系方式",
    linksTitle: "继续规划您的产品系列",
    linksCopy: "结合更多产品、生产能力与采购内容，进一步明确钱包定制需求。",
    links: [
      { href: "/zh/products", label: "浏览全部产品", description: "对比钱包、旅行包、背包与其他真皮产品。" },
      { href: "/zh/about#production", label: "了解生产流程", description: "查看订单生产与品质检验环节。" },
      { href: "/zh/blog", label: "阅读采购内容", description: "明确材料、结构与供应商评估要求。" },
      { href: "/zh/contact#inquiry", label: "获取定制报价", description: "提供采购数量、目标市场与定制需求。" },
    ],
  },
} as const;

const airTagContent = {
  en: {
    home: "Home",
    products: "Products",
    category: "Wallets & Small Leather Goods",
    name: "Wholesale Genuine Leather AirTag Passport Holder Wallet",
    kicker: "Wholesale Travel Wallet · Style No. 1400",
    title: <>Wholesale Leather<br />AirTag Passport Wallet</>,
    intro: "A genuine leather passport organizer developed for wholesale and private-label orders, combining an AirTag holder, RFID protection, card storage, a zip pocket, passport sleeve and pen loop.",
    request: "Request Wholesale Quote",
    chat: "Discuss your order",
    galleryLabel: "AirTag passport wallet image gallery",
    showImage: "Show image",
    factsLabel: "Product information overview",
    facts: [
      ["Style No.", "1400"],
      ["Material", "Genuine leather"],
      ["Closed Size", "14 × 11 × 1 cm"],
      ["Weight", "0.08 kg"],
      ["Colors", "5 SKU colors"],
      ["Function", "AirTag slot + RFID"],
      ["MOQ", "To be confirmed"],
    ],
    specifications: "Wholesale Product Specifications",
    specNote: "Dimensions, weight, construction and colors are based on the supplied product information and images. AirTag is not included. MOQ, samples and production timing are confirmed after the final OEM / ODM brief.",
    specs: [
      { left: ["Product Category", "Travel wallet / passport holder"], right: ["Style No.", "1400"] },
      { left: ["Closed Dimensions", "14 × 11 × 1 cm (5.5 × 4.3 × 0.4 in)"], right: ["Weight", "0.08 kg"] },
      { left: ["Material", "Genuine leather"], right: ["Construction", "Bifold passport wallet"] },
      { left: ["SKU Colors", "Brown / Dark Green / Navy Blue / Burgundy / Black"], right: ["Tracking", "Dedicated AirTag slot; AirTag not included"] },
      { left: ["Interior", "3 card slots, passport pocket, zip pocket and pen loop"], right: ["Protection", "RFID-blocking design"] },
      { left: ["Customization", "Logo, color, layout and packaging"], right: ["MOQ", "To be confirmed"] },
      { left: ["Sample Lead Time", "To be confirmed"], right: ["Production Lead Time", "To be confirmed"] },
    ],
    materialTitle: "Material & Construction",
    materialName: "Genuine Leather Travel Organizer",
    materialCopy: "The structured bifold body keeps a passport, cards and small travel essentials together. Leather grade, thickness, finish and lining can be finalized during sampling.",
    colorsTitle: "SKU Color Options",
    colorsCopy: "Five colors are shown in the supplied product images. Custom color matching can be evaluated against order quantity and material availability.",
    customizationTitle: "OEM / ODM Customization",
    packagingTitle: "Wholesale Packaging",
    processTitle: "Order Process",
    factoryKicker: "Visit Marrant",
    factoryTitle: "Review Your Passport Wallet Project in Guangzhou",
    factoryCopy: "Importers, distributors and brand teams can review leather, layout, logo applications, stitching and quality checkpoints with our product team.",
    factoryPoints: ["Review leather and color options", "Confirm AirTag and RFID construction", "Discuss private-label packaging"],
    factoryCta: "Plan a Factory Visit",
    faqTitle: "Wholesale FAQs",
    faqs: [
      ["Which SKU colors are available?", "The supplied options are brown, dark green, navy blue, burgundy and black. Final color standards are confirmed before sampling."],
      ["Is an Apple AirTag included?", "No. The wallet includes a dedicated holder designed for an AirTag, but the tracking device is sold separately."],
      ["What fits inside the wallet?", "The pictured layout includes three card slots, a passport sleeve, a central zip pocket, a pen loop and an AirTag holder."],
      ["Can we add our logo or change the interior?", "Yes. Logo treatment, leather color, interior layout and packaging can be evaluated for OEM / ODM orders."],
      ["What is the wholesale MOQ?", "MOQ and lead time are confirmed after the leather, color, logo, packaging and order requirements are finalized."],
    ],
    inquiryTitle: "Request a Wholesale Quote",
    inquiryCopy: "Share your quantity, destination market and customization requirements for style 1400.",
    form: {
      name: "Your Name *", company: "Company Name", email: "Email *", phone: "Phone *", country: "Country / Region",
      product: "Product Interest", quantity: "Estimated Order Quantity", message: "Message *", privacy: "I agree to the Privacy Policy.",
      submit: "Submit Inquiry", sending: "Sending…",
      success: "Thank you. Your inquiry has been sent and our team will reply within one business day.",
      error: "We could not send your inquiry. Please try again or contact us by email.",
    },
    partnerTitle: "Why Partner with Marrant?",
    partnerPoints: ["Leather goods development and manufacturing", "Flexible private-label customization", "Quality control throughout production", "Support from sample to shipment"],
    contactTitle: "Contact Information",
    linksTitle: "Continue Planning Your Collection",
    linksCopy: "Compare products, review our manufacturing process or send your wholesale requirements.",
    links: [
      { href: "/products", label: "Browse all collections", description: "Compare wallets, travel bags, backpacks and other leather goods." },
      { href: "/about#production", label: "See our production", description: "Understand the process and quality checkpoints behind an order." },
      { href: "/blog", label: "Read sourcing insights", description: "Prepare materials, construction and supplier requirements." },
      { href: "/contact#inquiry", label: "Start an inquiry", description: "Send your quantity, market and customization needs." },
    ],
  },
  zh: {
    home: "首页",
    products: "产品系列",
    category: "钱包与小皮具",
    name: "批发真皮 AirTag 防丢护照夹钱包",
    kicker: "批发旅行钱包 · 款号 1400",
    title: <>批发真皮 AirTag<br />防丢护照夹钱包</>,
    intro: "面向批发、进口商与品牌贴牌项目的真皮护照收纳钱包，集成 AirTag 槽位、RFID 防护、卡位、拉链袋、护照位与笔插。",
    request: "获取批发报价",
    chat: "沟通采购需求",
    galleryLabel: "AirTag 护照钱包产品图片",
    showImage: "查看图片",
    factsLabel: "产品信息概览",
    facts: [
      ["款号", "1400"],
      ["材质", "真皮"],
      ["闭合尺寸", "14 × 11 × 1 cm"],
      ["重量", "0.08 kg"],
      ["SKU 颜色", "5 种"],
      ["功能", "AirTag 槽 + RFID"],
      ["MOQ", "根据需求确认"],
    ],
    specifications: "批发产品规格",
    specNote: "尺寸、重量、结构与颜色根据已提供的商品资料及图片整理；产品不含 AirTag。MOQ、打样和大货周期需结合最终 OEM / ODM 方案确认。",
    specs: [
      { left: ["产品分类", "旅行钱包 / 护照夹"], right: ["款号", "1400"] },
      { left: ["闭合尺寸", "14 × 11 × 1 cm（5.5 × 4.3 × 0.4 in）"], right: ["重量", "0.08 kg"] },
      { left: ["材质", "真皮"], right: ["结构", "二折式护照钱包"] },
      { left: ["SKU 颜色", "棕色 / 深绿色 / 藏青色 / 酒红色 / 黑色"], right: ["防丢设计", "专用 AirTag 槽位；不含 AirTag"] },
      { left: ["内部结构", "3 个卡位、护照位、拉链袋与笔插"], right: ["安全防护", "RFID 防扫描设计"] },
      { left: ["定制项目", "标识、颜色、结构与包装"], right: ["MOQ", "根据需求确认"] },
      { left: ["打样周期", "根据需求确认"], right: ["大货周期", "根据需求确认"] },
    ],
    materialTitle: "材料与结构",
    materialName: "真皮旅行收纳护照夹",
    materialCopy: "挺括二折结构集中收纳护照、卡片与小件旅行物品。皮料等级、厚度、表面处理及内衬可在打样阶段确认。",
    colorsTitle: "SKU 颜色选项",
    colorsCopy: "当前商品图展示 5 种颜色；可结合采购数量与材料供应情况评估定制配色。",
    customizationTitle: "OEM / ODM 定制",
    packagingTitle: "批发包装选项",
    processTitle: "订单流程",
    factoryKicker: "到访玛轮特",
    factoryTitle: "在广州确认您的护照钱包项目",
    factoryCopy: "欢迎进口商、批发商与品牌团队现场确认皮料、结构、标识工艺、车缝和品质检验要求。",
    factoryPoints: ["确认皮料与颜色", "核对 AirTag 与 RFID 结构", "沟通品牌贴牌包装"],
    factoryCta: "预约工厂参观",
    faqTitle: "批发采购常见问题",
    faqs: [
      ["有哪些 SKU 颜色？", "现有商品图展示棕色、深绿色、藏青色、酒红色和黑色，最终颜色标准在打样前确认。"],
      ["产品包含 Apple AirTag 吗？", "不包含。钱包配有用于放置 AirTag 的专用槽位，追踪设备需另行购买。"],
      ["内部可以收纳什么？", "图片所示结构包括 3 个卡位、护照位、中央拉链袋、笔插和 AirTag 槽位。"],
      ["可以定制品牌标识和内部结构吗？", "可以。OEM / ODM 订单可评估标识工艺、皮料颜色、内部布局与包装定制。"],
      ["批发起订量是多少？", "MOQ 与交期需在皮料、颜色、标识、包装和订单要求确认后核算。"],
    ],
    inquiryTitle: "获取批发定制报价",
    inquiryCopy: "请提供款号 1400 的预计数量、销售市场与定制要求。",
    form: {
      name: "姓名 *", company: "公司名称", email: "电子邮箱 *", phone: "联系电话 *", country: "国家 / 地区",
      product: "意向产品", quantity: "预计采购数量", message: "需求说明 *", privacy: "我同意将以上信息用于本次采购咨询。",
      submit: "提交采购需求", sending: "正在发送…",
      success: "提交成功，我们将在一个工作日内回复。",
      error: "暂时无法发送，请稍后重试或直接通过邮箱联系我们。",
    },
    partnerTitle: "为什么选择玛轮特？",
    partnerPoints: ["真皮产品开发与制造", "灵活的品牌贴牌定制", "生产全过程品质管控", "从打样到出货持续跟进"],
    contactTitle: "联系方式",
    linksTitle: "继续规划您的产品系列",
    linksCopy: "对比更多产品、了解生产流程或提交批发采购需求。",
    links: [
      { href: "/zh/products", label: "浏览全部产品", description: "对比钱包、旅行包、背包与其他真皮产品。" },
      { href: "/zh/about#production", label: "了解生产流程", description: "查看订单生产与品质检验环节。" },
      { href: "/zh/blog", label: "阅读采购内容", description: "明确材料、结构与供应商评估要求。" },
      { href: "/zh/contact#inquiry", label: "获取定制报价", description: "提供采购数量、目标市场与定制需求。" },
    ],
  },
} as const;

const compassContent = {
  en: {
    home: "Home",
    products: "Products",
    category: "Wallets & Small Leather Goods",
    name: "Wholesale Top-Grain Leather Compass Bifold Wallet",
    kicker: "Wholesale Men's Wallet · Style No. 1040",
    title: <>Wholesale Leather<br />Compass Bifold Wallet</>,
    intro: "A compact top-grain cowhide bifold wallet for wholesale and private-label collections, finished with a vintage compass embossing, anti-scan lining and a practical 15-position storage layout.",
    request: "Request Wholesale Quote",
    chat: "Discuss your order",
    galleryLabel: "Compass bifold wallet image gallery",
    showImage: "Show image",
    factsLabel: "Product information overview",
    facts: [
      ["Style No.", "1040"],
      ["Material", "Top-grain cowhide"],
      ["Dimensions", "11 × 2 × 9 cm"],
      ["Weight", "85 g"],
      ["Construction", "Bifold"],
      ["SKU Options", "9 listed variants"],
      ["MOQ", "To be confirmed"],
    ],
    specifications: "Wholesale Product Specifications",
    specNote: "Material, size, weight, construction and SKU options are based on the supplied 1688 listing and its main images. MOQ, samples, production timing and final anti-scan performance are confirmed against the OEM / ODM brief.",
    specs: [
      { left: ["Product Category", "Men's bifold wallet"], right: ["Style No.", "1040"] },
      { left: ["Dimensions", "11 × 2 × 9 cm (4.3 × 0.78 × 3.5 in)"], right: ["Weight", "85 g (0.085 kg)"] },
      { left: ["Material", "Top-grain cowhide leather"], right: ["Construction", "Compact bifold"] },
      { left: ["Surface Detail", "Compass embossing; additional motifs listed"], right: ["Lining", "Anti-magnetic / anti-scan lining"] },
      { left: ["Interior", "15-position card, cash, photo and coin storage layout"], right: ["Closure Detail", "Snap coin pocket"] },
      { left: ["Listed Variants", "5 compass colors + plain, sailor, anchor and tower options"], right: ["Use", "Everyday carry"] },
      { left: ["Logo Methods", "Screen print, foil, laser, embossing, embroidery or color print"], right: ["MOQ", "To be confirmed by process"] },
      { left: ["Sample Lead Time", "To be confirmed"], right: ["Production Lead Time", "To be confirmed"] },
    ],
    materialTitle: "Material & Construction",
    materialName: "Top-Grain Cowhide with Vintage Finish",
    materialCopy: "The listed cowhide develops natural tonal and surface variation, supporting a vintage look around the embossed compass motif. Leather grade, color standard, lining and finish are reconfirmed during sampling.",
    colorsTitle: "Listed SKU Options",
    colorsCopy: "The source listing includes five compass colorways plus plain, sailor, anchor and tower motif options. Final color and motif standards are approved before production.",
    customizationTitle: "OEM / ODM Customization",
    packagingTitle: "Wholesale Packaging",
    processTitle: "Order Process",
    factoryKicker: "Visit Marrant",
    factoryTitle: "Review Your Wallet Project in Guangzhou",
    factoryCopy: "Importers, distributors and brand teams can review cowhide selection, embossing, lining, logo applications, stitching and quality checkpoints with our product team.",
    factoryPoints: ["Review leather and color options", "Confirm embossing and interior layout", "Discuss private-label packaging"],
    factoryCta: "Plan a Factory Visit",
    faqTitle: "Wholesale FAQs",
    faqs: [
      ["Which SKU options are listed?", "The listing shows coffee, brown, oil coffee, oil red brown and black compass versions, plus plain coffee, sailor, anchor and tower motif versions."],
      ["What are the dimensions and weight?", "The closed wallet measures 11 × 2 × 9 cm and the listed unit weight is 85 g."],
      ["How is the interior organized?", "The pictured layout provides card, cash, photo and coin storage, including a snap coin pocket, across a 15-position design."],
      ["Can we add our logo?", "Yes. The source lists screen printing, hot foil, laser marking, embossing, embroidery and color printing. We confirm the suitable process and MOQ after reviewing your artwork."],
      ["Does the wallet include anti-scan protection?", "The source specifies anti-magnetic lining and presents an anti-scan design. Final materials and required performance standards should be confirmed during sampling."],
      ["What is the wholesale MOQ?", "MOQ and lead time are confirmed after leather, color, motif, logo, packaging and order requirements are finalized."],
    ],
    inquiryTitle: "Request a Wholesale Quote",
    inquiryCopy: "Share your quantity, destination market and customization requirements for style 1040.",
    form: {
      name: "Your Name *", company: "Company Name", email: "Email *", phone: "Phone *", country: "Country / Region",
      product: "Product Interest", quantity: "Estimated Order Quantity", message: "Message *", privacy: "I agree to the Privacy Policy.",
      submit: "Submit Inquiry", sending: "Sending…",
      success: "Thank you. Your inquiry has been sent and our team will reply within one business day.",
      error: "We could not send your inquiry. Please try again or contact us by email.",
    },
    partnerTitle: "Why Partner with Marrant?",
    partnerPoints: ["Leather goods development and manufacturing", "Flexible private-label customization", "Quality control throughout production", "Support from sample to shipment"],
    contactTitle: "Contact Information",
    linksTitle: "Continue Planning Your Collection",
    linksCopy: "Compare products, review our manufacturing process or send your wholesale requirements.",
    links: [
      { href: "/products", label: "Browse all collections", description: "Compare wallets, travel bags, backpacks and other leather goods." },
      { href: "/about#production", label: "See our production", description: "Understand the process and quality checkpoints behind an order." },
      { href: "/blog", label: "Read sourcing insights", description: "Prepare materials, construction and supplier requirements." },
      { href: "/contact#inquiry", label: "Start an inquiry", description: "Send your quantity, market and customization needs." },
    ],
  },
  zh: {
    home: "首页",
    products: "产品系列",
    category: "钱包与小皮具",
    name: "批发头层牛皮罗盘压花男士二折钱包",
    kicker: "批发男士钱包 · 款号 1040",
    title: <>批发头层牛皮<br />罗盘压花二折钱包</>,
    intro: "面向批发、进口商与品牌贴牌项目的头层牛皮男士二折钱包，采用复古罗盘压花、防磁防盗刷里布与 15 个功能位收纳结构。",
    request: "获取批发报价",
    chat: "沟通采购需求",
    galleryLabel: "罗盘压花二折钱包产品图片",
    showImage: "查看图片",
    factsLabel: "产品信息概览",
    facts: [
      ["款号", "1040"],
      ["材质", "头层牛皮"],
      ["尺寸", "11 × 2 × 9 cm"],
      ["重量", "85 g"],
      ["结构", "二折式"],
      ["SKU 选项", "9 种"],
      ["MOQ", "根据需求确认"],
    ],
    specifications: "批发产品规格",
    specNote: "材质、尺寸、重量、结构与 SKU 选项根据所提供的 1688 商品资料及主图整理；MOQ、打样、大货周期及最终防盗刷性能需结合 OEM / ODM 方案确认。",
    specs: [
      { left: ["产品分类", "男士二折钱包"], right: ["款号", "1040"] },
      { left: ["尺寸", "11 × 2 × 9 cm（4.3 × 0.78 × 3.5 in）"], right: ["重量", "85 g（0.085 kg）"] },
      { left: ["材质", "头层牛皮"], right: ["结构", "短款二折式"] },
      { left: ["表面设计", "罗盘压花；另有其他图案"], right: ["里布", "防磁 / 防盗刷里布"] },
      { left: ["内部结构", "15 个功能位，收纳卡、现金、照片与零钱"], right: ["闭合细节", "按扣零钱位"] },
      { left: ["现有款式", "5 种罗盘配色 + 素面、水手、船锚、铁塔"], right: ["适用场景", "日常搭配"] },
      { left: ["标识工艺", "丝印、烫金银、激光、压印、刺绣或彩印"], right: ["MOQ", "按工艺确认"] },
      { left: ["打样周期", "根据需求确认"], right: ["大货周期", "根据需求确认"] },
    ],
    materialTitle: "材料与结构",
    materialName: "复古质感头层牛皮",
    materialCopy: "商品资料所列头层牛皮呈现自然色泽与表面变化，与罗盘压花形成复古质感。具体皮料等级、颜色标准、内衬与表面处理将在打样阶段复核。",
    colorsTitle: "现有 SKU 选项",
    colorsCopy: "链接列出 5 种罗盘配色，以及素面、水手、船锚和铁塔图案款；大货前需确认最终颜色与图案标准。",
    customizationTitle: "OEM / ODM 定制",
    packagingTitle: "批发包装选项",
    processTitle: "订单流程",
    factoryKicker: "到访玛轮特",
    factoryTitle: "在广州确认您的钱包项目",
    factoryCopy: "欢迎进口商、批发商与品牌团队现场确认牛皮、压花、里布、标识工艺、车缝和品质检验要求。",
    factoryPoints: ["确认皮料与颜色", "核对压花与内部结构", "沟通品牌贴牌包装"],
    factoryCta: "预约工厂参观",
    faqTitle: "批发采购常见问题",
    faqs: [
      ["链接列出了哪些 SKU？", "现有选项包括疯马咖、棕色、油咖、油红棕和黑色罗盘款，以及疯马咖啡素面、水手、船锚和铁塔图案款。"],
      ["产品尺寸和重量是多少？", "钱包闭合尺寸为 11 × 2 × 9 cm，商品资料所列单个重量为 85 g。"],
      ["内部可以收纳什么？", "图片展示卡位、现金位、照片位与按扣零钱位，共采用 15 个功能位设计。"],
      ["可以定制品牌标识吗？", "可以。链接列出丝印、烫金银、激光、压印、刺绣和彩印等工艺；收到品牌图稿后确认适用工艺和 MOQ。"],
      ["是否有防盗刷功能？", "商品资料注明防磁里布并展示防盗刷设计；最终材料及所需性能标准建议在打样阶段确认。"],
      ["批发起订量是多少？", "MOQ 与周期需在皮料、颜色、图案、标识、包装和订单要求确定后确认。"],
    ],
    inquiryTitle: "获取批发报价",
    inquiryCopy: "请提供款号 1040 的预计数量、目标市场与定制要求。",
    form: {
      name: "姓名 *", company: "公司名称", email: "电子邮箱 *", phone: "联系电话 *", country: "国家 / 地区",
      product: "意向产品", quantity: "预计采购数量", message: "需求说明 *", privacy: "我同意将以上信息用于本次采购咨询。",
      submit: "提交采购需求", sending: "正在发送…",
      success: "提交成功，我们将在一个工作日内回复。",
      error: "暂时无法发送，请稍后重试或直接通过邮箱联系我们。",
    },
    partnerTitle: "为什么选择玛轮特？",
    partnerPoints: ["真皮产品开发与制造", "灵活的品牌贴牌定制", "生产过程品质管控", "从样品到出货持续支持"],
    contactTitle: "联系方式",
    linksTitle: "继续规划您的产品系列",
    linksCopy: "对比更多产品、了解生产流程或提交批发采购需求。",
    links: [
      { href: "/zh/products", label: "浏览全部产品", description: "对比钱包、旅行包、背包与其他真皮产品。" },
      { href: "/zh/about#production", label: "了解生产流程", description: "查看订单生产与品质检验环节。" },
      { href: "/zh/blog", label: "阅读采购内容", description: "明确材料、结构与供应商评估要求。" },
      { href: "/zh/contact#inquiry", label: "获取定制报价", description: "提供采购数量、目标市场与定制需求。" },
    ],
  },
} as const;

const zipCoinWalletContent = {
  en: {
    home: "Home",
    products: "Products",
    category: "Wallets & Small Leather Goods / Wallets",
    name: "Wholesale Top-Grain Cowhide Zip Coin Pocket Bifold Wallet",
    kicker: "Wholesale Men's Wallet · Style No. 7042",
    title: <>Wholesale Top-Grain Leather<br />Zip Coin Pocket Wallet</>,
    intro: "A compact men's bifold wallet for wholesale and private-label collections, made from top-grain cowhide with a rear zip coin pocket, snap-tab closure and multi-card layout.",
    request: "Request Wholesale Quote",
    chat: "Discuss your order",
    galleryLabel: "Style 7042 leather bifold wallet image gallery",
    showImage: "Show image",
    factsLabel: "Product information overview",
    facts: [
      ["Style No.", "7042"],
      ["Material", "Top-grain cowhide"],
      ["Listed Size", "12 × 2 × 9.5 cm"],
      ["Listed Weight", "300 g"],
      ["Construction", "Compact bifold"],
      ["SKU Colors", "4 listed colors"],
      ["Stock MOQ", "1 pc listed"],
    ],
    specifications: "Wholesale Product Specifications",
    specNote: "Material, structure, colors, listed package dimensions and weight are taken from the supplied 1688 offer. The two uploaded product photos are authoritative for the exterior appearance. Custom MOQ, samples and production timing are confirmed against the final OEM / ODM brief.",
    specs: [
      { left: ["Product Category", "Wallets & Small Leather Goods / Wallets"], right: ["Style No.", "7042"] },
      { left: ["Listed Package Size", "12 × 2 × 9.5 cm (4.72 × 0.79 × 3.74 in)"], right: ["Listed Package Weight", "300 g (0.30 kg)"] },
      { left: ["Material", "Top-grain cowhide leather"], right: ["Lining", "Polyester-cotton"] },
      { left: ["Construction", "Bifold with snap-tab closure"], right: ["Function", "Wear-resistant"] },
      { left: ["Interior", "Card slots, cash compartment, photo slot and zip pocket"], right: ["Style", "European-American vintage"] },
      { left: ["Listed Colors", "Black / Coffee / Brown / Red Coffee"], right: ["Branding", "Screen print, foil, laser, embossing, embroidery or color print listed"] },
      { left: ["Sample Lead Time", "To be confirmed"], right: ["Production Lead Time", "To be confirmed"] },
    ],
    materialTitle: "Material & Construction",
    materialName: "Top-Grain Cowhide with Vintage Character",
    materialCopy: "The listing specifies top-grain cowhide with a European-American vintage style. The uploaded photos show natural tonal variation, contrast stitching, antique-tone zipper hardware and a snap-tab closure. Final leather finish and color standard are approved during sampling.",
    colorsTitle: "Listed SKU Colors",
    colorsCopy: "The source offer lists black, coffee, brown and red coffee. Uploaded photos are provided for black and coffee; final color standards are confirmed before production.",
    customizationTitle: "OEM / ODM Customization",
    packagingTitle: "Wholesale Packaging",
    processTitle: "Order Process",
    factoryKicker: "Visit Marrant",
    factoryTitle: "Review Your Wallet Project in Guangzhou",
    factoryCopy: "Importers, distributors and brand teams can review cowhide selection, zipper hardware, lining, logo applications, stitching and quality checkpoints with our product team.",
    factoryPoints: ["Review leather and color options", "Confirm zipper and interior layout", "Discuss private-label packaging"],
    factoryCta: "Plan a Factory Visit",
    faqTitle: "Wholesale FAQs",
    faqs: [
      ["Which colors are listed for style 7042?", "The source offer lists black, coffee, brown and red coffee. The uploaded product photos show black and coffee versions."],
      ["What size and weight are listed?", "The 1688 packaging table lists 12 × 2 × 9.5 cm and 300 g for each color. These are presented as listed package data and should be reconfirmed before production."],
      ["What storage features are included?", "The listing describes a multi-card short wallet. The uploaded photos clearly show a rear zip coin pocket and snap-tab closure; the final interior layout is confirmed during sampling."],
      ["Can we add our logo?", "The source lists screen printing, foil stamping, laser marking, embossing, embroidery and color printing. The suitable process and MOQ are confirmed after artwork review."],
      ["What is the minimum order quantity?", "The source lists a one-piece stock MOQ. Custom branding MOQs vary by method, color and order requirements."],
      ["How long do samples and production take?", "Sample and bulk-production schedules are confirmed after leather, color, logo, packaging and quantity requirements are finalized."],
    ],
    inquiryTitle: "Request a Wholesale Quote",
    inquiryCopy: "Share your quantity, destination market and customization requirements for style 7042.",
    form: {
      name: "Your Name *", company: "Company Name", email: "Email *", phone: "Phone *", country: "Country / Region",
      product: "Product Interest", quantity: "Estimated Order Quantity", message: "Message *", privacy: "I agree to the Privacy Policy.",
      submit: "Submit Inquiry", sending: "Sending…",
      success: "Thank you. Your inquiry has been sent and our team will reply within one business day.",
      error: "We could not send your inquiry. Please try again or contact us by email.",
    },
    partnerTitle: "Why Partner with Marrant?",
    partnerPoints: ["Leather goods development and manufacturing", "Flexible private-label customization", "Quality control throughout production", "Support from sample to shipment"],
    contactTitle: "Contact Information",
    linksTitle: "Continue Planning Your Collection",
    linksCopy: "Compare products, review our manufacturing process or send your wholesale requirements.",
    links: [
      { href: "/products", label: "Browse all collections", description: "Compare wallets, travel bags, backpacks and other leather goods." },
      { href: "/about#production", label: "See our production", description: "Understand the process and quality checkpoints behind an order." },
      { href: "/blog", label: "Read sourcing insights", description: "Prepare materials, construction and supplier requirements." },
      { href: "/contact#inquiry", label: "Start an inquiry", description: "Send your quantity, market and customization needs." },
    ],
  },
  zh: {
    home: "首页",
    products: "产品系列",
    category: "钱包与小皮具 / 钱包",
    name: "批发头层牛皮拉链零钱袋男士短款二折钱包",
    kicker: "批发男士钱包 · 款号 7042",
    title: <>批发头层牛皮<br />拉链零钱袋短款钱包</>,
    intro: "面向批发、进口商与品牌贴牌项目的男士短款二折钱包，采用头层牛皮、背面拉链零钱袋、搭扣闭合与多卡位结构。",
    request: "获取批发报价",
    chat: "沟通采购需求",
    galleryLabel: "7042 头层牛皮短款钱包产品图片",
    showImage: "查看图片",
    factsLabel: "产品信息概览",
    facts: [
      ["款号", "7042"],
      ["材质", "头层牛皮"],
      ["所列尺寸", "12 × 2 × 9.5 cm"],
      ["所列重量", "300 g"],
      ["结构", "短款二折式"],
      ["SKU 颜色", "4 种"],
      ["现货起批", "链接标注 1 个"],
    ],
    specifications: "批发产品规格",
    specNote: "材质、结构、颜色、所列包装尺寸与重量来自所提供的 1688 商品链接；两张用户上传产品图作为外观依据。定制 MOQ、打样及大货周期需结合最终 OEM / ODM 方案确认。",
    specs: [
      { left: ["产品分类", "钱包与小皮具 / 钱包"], right: ["款号", "7042"] },
      { left: ["所列包装尺寸", "12 × 2 × 9.5 cm（4.72 × 0.79 × 3.74 in）"], right: ["所列包装重量", "300 g（0.30 kg）"] },
      { left: ["材质", "头层牛皮"], right: ["里料", "涤棉"] },
      { left: ["结构", "二折式搭扣闭合"], right: ["功能", "耐磨"] },
      { left: ["内部结构", "含卡位、现金位、照片位、拉链袋"], right: ["风格", "欧美复古"] },
      { left: ["现有颜色", "黑色 / 咖啡 / 棕色 / 红咖"], right: ["标识工艺", "链接列出丝印、烫金银、激光、压印、刺绣和彩印"] },
      { left: ["打样周期", "根据需求确认"], right: ["大货周期", "根据需求确认"] },
    ],
    materialTitle: "材料与结构",
    materialName: "复古质感头层牛皮",
    materialCopy: "链接注明采用头层牛皮与欧美复古风格。用户实拍图展示自然色泽变化、撞色车缝线、复古色拉链五金与搭扣闭合；具体皮面效果和颜色标准在打样阶段确认。",
    colorsTitle: "现有 SKU 颜色",
    colorsCopy: "链接列出黑色、咖啡、棕色和红咖四种颜色；用户上传图片展示黑色与咖啡色，大货前确认最终色板。",
    customizationTitle: "OEM / ODM 定制",
    packagingTitle: "批发包装选项",
    processTitle: "订单流程",
    factoryKicker: "到访玛轮特",
    factoryTitle: "在广州确认您的钱包项目",
    factoryCopy: "欢迎进口商、批发商与品牌团队现场确认牛皮、拉链五金、里布、标识工艺、车缝和品质检验要求。",
    factoryPoints: ["确认皮料与颜色", "核对拉链与内部结构", "沟通品牌贴牌包装"],
    factoryCta: "预约工厂参观",
    faqTitle: "批发采购常见问题",
    faqs: [
      ["7042 有哪些颜色？", "链接列出黑色、咖啡、棕色与红咖；用户上传产品图展示黑色与咖啡色。"],
      ["产品尺寸和重量是多少？", "1688 包装信息表对每种颜色均列出 12 × 2 × 9.5 cm、300 g。页面按所列包装数据展示，大货前建议复核。"],
      ["有哪些收纳结构？", "链接标题注明多卡位短款钱包；用户实拍图清楚展示背面拉链零钱袋与搭扣闭合，最终内部结构在打样阶段确认。"],
      ["可以定制品牌标识吗？", "链接列出丝印、烫金银、激光、压印、刺绣和彩印等工艺；收到图稿后确认适用工艺与 MOQ。"],
      ["最低起订量是多少？", "链接标注现货 1 个起批；定制标识的 MOQ 会根据工艺、颜色与订单要求变化。"],
      ["打样和大货生产需要多久？", "需在皮料、颜色、标识、包装与采购数量确认后安排打样和生产周期。"],
    ],
    inquiryTitle: "获取批发报价",
    inquiryCopy: "请提供款号 7042 的预计数量、目标市场与定制要求。",
    form: {
      name: "姓名 *", company: "公司名称", email: "电子邮箱 *", phone: "联系电话 *", country: "国家 / 地区",
      product: "意向产品", quantity: "预计采购数量", message: "需求说明 *", privacy: "我同意将以上信息用于本次采购咨询。",
      submit: "提交采购需求", sending: "正在发送…",
      success: "提交成功，我们将在一个工作日内回复。",
      error: "暂时无法发送，请稍后重试或直接通过邮箱联系我们。",
    },
    partnerTitle: "为什么选择玛轮特？",
    partnerPoints: ["真皮产品开发与制造", "灵活的品牌贴牌定制", "生产过程品质管控", "从样品到出货持续支持"],
    contactTitle: "联系方式",
    linksTitle: "继续规划您的产品系列",
    linksCopy: "对比更多产品、了解生产流程或提交批发采购需求。",
    links: [
      { href: "/zh/products", label: "浏览全部产品", description: "对比钱包、旅行包、背包与其他真皮产品。" },
      { href: "/zh/about#production", label: "了解生产流程", description: "查看订单生产与品质检验环节。" },
      { href: "/zh/blog", label: "阅读采购内容", description: "明确材料、结构与供应商评估要求。" },
      { href: "/zh/contact#inquiry", label: "获取定制报价", description: "提供采购数量、目标市场与定制需求。" },
    ],
  },
} as const;

const cardHolderContent = {
  en: {
    home: "Home",
    products: "Products",
    category: "Card Holders",
    name: "Wholesale Crazy Horse Leather Slim Card Holder",
    kicker: "Wholesale Leather Card Holder · Style No. 1343",
    title: <>Wholesale Crazy Horse Leather<br />Slim Card Holder</>,
    intro: "A lightweight genuine leather card holder with a crazy-horse finish, compact flat construction and practical card storage for wholesale and private-label collections.",
    request: "Request Wholesale Quote",
    chat: "Discuss your order",
    galleryLabel: "Style 1343 crazy horse leather card holder image gallery",
    showImage: "Show image",
    factsLabel: "Product information overview",
    facts: [
      ["Style No.", "1343"], ["Material", "Genuine leather"], ["Listed Size", "10 × 0.5 × 7.5 cm"], ["Weight", "20 g"],
      ["Colors", "6 listed options"], ["Feature", "Lightweight & compact"], ["MOQ", "To be confirmed"],
    ],
    specifications: "Wholesale Product Specifications",
    specNote: "Material, dimensions, weight, construction and colors are based on the live 1688 listing and the three supplied product images. Cards and cash shown in the photos are display props and are not included. MOQ, packaging and lead times are confirmed against the final order brief.",
    specs: [
      { left: ["Product Category", "Card Holders"], right: ["Style No.", "1343"] },
      { left: ["Listed Dimensions (L × W × H)", "10 × 0.5 × 7.5 cm (3.9 × 0.2 × 3.0 in)"], right: ["Weight", "20 g (0.02 kg)"] },
      { left: ["Material", "Genuine leather with crazy-horse finish"], right: ["Construction", "Flat one-fold card holder"] },
      { left: ["SKU Colors", "Crazy Horse Coffee / Brown / Red / Green / Blue / Black"], right: ["Pattern", "Solid color"] },
      { left: ["Storage", "Multiple card slots and central storage pocket shown"], right: ["Use", "Daily card carry"] },
      { left: ["Included", "Card holder only; cards and cash not included"], right: ["Customization", "Logo, color, layout and packaging can be evaluated"] },
      { left: ["Packaging", "To be confirmed"], right: ["MOQ", "To be confirmed"] },
      { left: ["Sample Lead Time", "To be confirmed"], right: ["Production Lead Time", "To be confirmed"] },
    ],
    materialTitle: "Material & Construction",
    materialName: "Crazy Horse Finish Genuine Leather",
    materialCopy: "The leather surface shows the tonal variation and natural marks associated with a vintage crazy-horse finish. Leather selection, thickness, color standard and edge treatment are reconfirmed during sampling.",
    colorsTitle: "Listed SKU Colors",
    colorsCopy: "The listing names six colors: Crazy Horse Coffee, brown, red, green, blue and black. Brown was shown as sold out during source review; final availability is reconfirmed before ordering.",
    customizationTitle: "OEM / ODM Customization",
    packagingTitle: "Wholesale Packaging",
    processTitle: "Order Process",
    factoryKicker: "Visit Marrant",
    factoryTitle: "Review Your Card Holder Project in Guangzhou",
    factoryCopy: "Importers, distributors and brand teams can review leather, color, card-slot construction, logo applications, stitching and quality checkpoints with our product team.",
    factoryPoints: ["Review leather and color options", "Confirm card-slot construction", "Discuss private-label packaging"],
    factoryCta: "Plan a Factory Visit",
    faqTitle: "Wholesale FAQs",
    faqs: [
      ["Which colors are listed?", "The listing names Crazy Horse Coffee, brown, red, green, blue and black. Brown was shown as sold out when the source was reviewed, so current availability should be reconfirmed."],
      ["What are the dimensions and weight?", "The 1688 packaging table lists 10 × 0.5 × 7.5 cm (L × W × H) and a unit weight of 20 g."],
      ["What can the holder carry?", "The supplied photos show multiple card slots and a central storage pocket for cards or folded cash. Cards and cash shown are not included."],
      ["Can we add our logo or adjust the layout?", "Logo treatment, color, card-slot layout and packaging can be evaluated after the artwork, quantity and order requirements are reviewed."],
      ["What is the wholesale MOQ?", "MOQ, packaging, sample timing and production lead time are confirmed after the material, color, logo and quantity requirements are finalized."],
    ],
    inquiryTitle: "Request a Wholesale Quote",
    inquiryCopy: "Share your quantity, destination market and customization requirements for style 1343.",
    form: {
      name: "Your Name *", company: "Company Name", email: "Email *", phone: "Phone *", country: "Country / Region",
      product: "Product Interest", quantity: "Estimated Order Quantity", message: "Message *", privacy: "I agree to the Privacy Policy.",
      submit: "Submit Inquiry", sending: "Sending…", success: "Thank you. Your inquiry has been sent and our team will reply within one business day.",
      error: "We could not send your inquiry. Please try again or contact us by email.",
    },
    partnerTitle: "Why Partner with Marrant?",
    partnerPoints: ["Leather goods development and manufacturing", "Flexible private-label customization", "Quality control throughout production", "Support from sample to shipment"],
    contactTitle: "Contact Information",
    linksTitle: "Continue Planning Your Collection",
    linksCopy: "Compare small leather goods, review our manufacturing process or send your wholesale requirements.",
    links: [
      { href: "/products", label: "Browse all collections", description: "Compare card holders, wallets, travel bags and other leather goods." },
      { href: "/about#production", label: "See our production", description: "Understand the process and quality checkpoints behind an order." },
      { href: "/blog", label: "Read sourcing insights", description: "Prepare materials, construction and supplier requirements." },
      { href: "/contact#inquiry", label: "Start an inquiry", description: "Send your quantity, market and customization needs." },
    ],
  },
  zh: {
    home: "首页",
    products: "产品系列",
    category: "卡包",
    name: "批发疯马皮轻薄卡包",
    kicker: "批发真皮卡包 · 款号 1343",
    title: <>批发疯马皮<br />轻薄卡包</>,
    intro: "面向进口商、批发商、电商品牌与贴牌项目的轻薄真皮卡包，采用疯马皮复古表面与扁平卡位结构，便于日常携带卡片。",
    request: "获取批发报价",
    chat: "沟通采购需求",
    galleryLabel: "1343 疯马皮轻薄卡包产品图片",
    showImage: "查看图片",
    factsLabel: "产品信息概览",
    facts: [
      ["款号", "1343"], ["材质", "真皮"], ["所列尺寸", "10 × 0.5 × 7.5 cm"], ["重量", "20 g"],
      ["颜色", "6 种链接选项"], ["特点", "轻薄、便携"], ["MOQ", "根据需求确认"],
    ],
    specifications: "批发产品规格",
    specNote: "材质、尺寸、重量、结构与颜色根据 1688 在线商品页及你提供的 3 张产品图整理。图片中的卡片与钞票仅用于展示，不包含在产品内；MOQ、包装与交期需结合最终订单要求确认。",
    specs: [
      { left: ["产品分类", "卡包"], right: ["款号", "1343"] },
      { left: ["所列尺寸（长 × 宽 × 高）", "10 × 0.5 × 7.5 cm（3.9 × 0.2 × 3.0 in）"], right: ["重量", "20 g（0.02 kg）"] },
      { left: ["材质", "真皮，疯马皮表面"], right: ["结构", "扁平一折式卡包"] },
      { left: ["SKU 颜色", "疯马咖 / 棕色 / 红色 / 绿色 / 蓝色 / 黑色"], right: ["图案", "纯色"] },
      { left: ["收纳结构", "图片展示多卡位与中央收纳位"], right: ["适用场景", "日常卡片收纳"] },
      { left: ["包装内容", "仅卡包；不含展示卡片与钞票"], right: ["定制", "可评估标识、颜色、结构与包装"] },
      { left: ["包装", "根据需求确认"], right: ["MOQ", "根据需求确认"] },
      { left: ["打样周期", "根据需求确认"], right: ["大货周期", "根据需求确认"] },
    ],
    materialTitle: "材料与结构",
    materialName: "疯马皮质感真皮",
    materialCopy: "皮面呈现复古疯马皮常见的色泽变化与自然痕迹。具体皮料、厚度、颜色标准与边缘处理将在打样阶段复核。",
    colorsTitle: "链接所列 SKU 颜色",
    colorsCopy: "链接列出疯马咖、棕色、红色、绿色、蓝色和黑色共 6 种颜色；采集时棕色显示售罄，实际可供情况需在下单前再次确认。",
    customizationTitle: "OEM / ODM 定制",
    packagingTitle: "批发包装选项",
    processTitle: "订单流程",
    factoryKicker: "到访玛轮特",
    factoryTitle: "在广州确认您的卡包项目",
    factoryCopy: "欢迎进口商、批发商与品牌团队现场确认皮料、颜色、卡位结构、标识工艺、车缝和品质检验要求。",
    factoryPoints: ["确认皮料与颜色", "核对卡位结构", "沟通品牌贴牌包装"],
    factoryCta: "预约工厂参观",
    faqTitle: "批发采购常见问题",
    faqs: [
      ["链接列出了哪些颜色？", "商品页列出疯马咖、棕色、红色、绿色、蓝色和黑色；采集时棕色显示售罄，现货情况需再次确认。"],
      ["产品尺寸和重量是多少？", "1688 包装信息表按长 × 宽 × 高列出 10 × 0.5 × 7.5 cm，单个重量为 20 g。"],
      ["卡包可以收纳什么？", "提供的图片展示多个卡位和中央收纳位，可放卡片或折叠钞票；图片中的卡片与钞票不包含在产品内。"],
      ["可以增加品牌标识或调整结构吗？", "收到品牌图稿、数量和订单要求后，可评估标识工艺、颜色、卡位结构与包装方案。"],
      ["批发起订量是多少？", "MOQ、包装、打样周期与大货周期需在皮料、颜色、标识及数量要求确定后确认。"],
    ],
    inquiryTitle: "获取批发报价",
    inquiryCopy: "请提供款号 1343 的预计数量、目标市场与定制要求。",
    form: {
      name: "姓名 *", company: "公司名称", email: "电子邮箱 *", phone: "联系电话 *", country: "国家 / 地区",
      product: "意向产品", quantity: "预计采购数量", message: "需求说明 *", privacy: "我同意将以上信息用于本次采购咨询。",
      submit: "提交采购需求", sending: "正在发送…", success: "提交成功，我们将在一个工作日内回复。",
      error: "暂时无法发送，请稍后重试或直接通过邮箱联系我们。",
    },
    partnerTitle: "为什么选择玛轮特？",
    partnerPoints: ["真皮产品开发与制造", "灵活的品牌贴牌定制", "生产过程品质管控", "从样品到出货持续支持"],
    contactTitle: "联系方式",
    linksTitle: "继续规划您的产品系列",
    linksCopy: "对比更多小皮具、了解生产流程或提交批发采购需求。",
    links: [
      { href: "/zh/products", label: "浏览全部产品", description: "对比卡包、钱包、旅行包与其他真皮产品。" },
      { href: "/zh/about#production", label: "了解生产流程", description: "查看订单生产与品质检验环节。" },
      { href: "/zh/blog", label: "阅读采购内容", description: "明确材料、结构与供应商评估要求。" },
      { href: "/zh/contact#inquiry", label: "获取定制报价", description: "提供采购数量、目标市场与定制需求。" },
    ],
  },
} as const;

const manicurePouchContent = {
  en: {
    home: "Home",
    products: "Products",
    category: "Manicure Tool Cases",
    name: "Wholesale Top-Grain Leather Manicure Scissors Storage Pouch",
    kicker: "Wholesale Leather Tool Pouch · Style No. Q1002",
    title: <>Wholesale Top-Grain Leather<br />Manicure Scissors Storage Pouch</>,
    intro: "An embossed top-grain cowhide pouch with layered storage pockets, an unlined interior and snap-flap closure for compact manicure-tool collections and private-label programs.",
    request: "Request Wholesale Quote",
    chat: "Discuss your order",
    galleryLabel: "Style Q1002 leather manicure scissors storage pouch image gallery",
    showImage: "Show image",
    factsLabel: "Product information overview",
    facts: [
      ["Style No.", "Q1002"], ["Material", "Top-grain cowhide"], ["Listed Size", "7.4 × 0.5 × 10.8 cm"],
      ["Color", "Coffee"], ["Lining", "Unlined"], ["Feature", "Layered tool storage"],
    ],
    specifications: "Wholesale Product Specifications",
    specNote: "Product name, material, lining, dimensions, color and customization options come from the supplied Q1002 product sheet; construction is described from the supplied images. MOQ, packaging and lead times are confirmed through direct consultation. Scissors, clippers and manicure tools shown are display props and are not included.",
    specs: [
      { left: ["Style No.", "Q1002"], right: ["Size", "7.4 × 0.5 × 10.8 cm (2.9 × 0.2 × 4.3 in)"] },
      { left: ["Material", "Top-grain cowhide"], right: ["Lining", "Unlined"] },
      { left: ["Color", "Coffee"], right: ["Surface", "Floral embossing shown"] },
      { left: ["Construction", "Layered pockets with snap-flap closure"], right: ["Use", "Compact manicure-tool storage"] },
      { left: ["Included", "Pouch only; tools not included"], right: ["MOQ / Packaging / Lead Time", "Contact us for details"] },
    ],
    materialTitle: "Material & Construction",
    materialName: "Embossed Top-Grain Cowhide",
    materialCopy: "The supplied images show a coffee-toned cowhide exterior with floral embossing, stitched edges and an unlined suede-side interior. Leather selection, embossing depth, edge finish and hardware color are reconfirmed during sampling.",
    colorsTitle: "Supplied SKU Color",
    colorsCopy: "The supplied product sheet lists coffee as the current color. Custom color development can be evaluated against your quantity, reference and final leather selection.",
    customizationTitle: "OEM / ODM Customization",
    packagingTitle: "Wholesale Packaging",
    processTitle: "Order Process",
    factoryKicker: "Visit Marrant",
    factoryTitle: "Review Your Small Leather Goods Project in Guangzhou",
    factoryCopy: "Importers, distributors and brand teams can review leather, embossing, pocket layout, logo applications, hardware and quality checkpoints with our product team.",
    factoryPoints: ["Review leather and embossing", "Confirm pocket layout and hardware", "Discuss private-label packaging"],
    factoryCta: "Plan a Factory Visit",
    faqTitle: "Wholesale FAQs",
    faqs: [
      ["What are the supplied dimensions?", "The supplied dimensions are 7.4 × 0.5 × 10.8 cm."],
      ["What can the pouch hold?", "The images show layered pockets suitable for small manicure tools. Final fit depends on your tool dimensions; the displayed tools are not included."],
      ["Is the pouch lined?", "The supplied product information describes the pouch as unlined, and the images show the suede side of the leather inside."],
      ["Can we change the logo, color or pocket layout?", "Logo, color, hardware, lining, packaging and layout adjustments can be evaluated after the artwork, quantity and tool-size requirements are reviewed."],
      ["What is the wholesale MOQ?", "MOQ, packaging, sample timing and production lead time are confirmed after the material, finish, customization and quantity requirements are finalized."],
    ],
    inquiryTitle: "Request a Wholesale Quote",
    inquiryCopy: "Share your quantity, target market, tool dimensions and customization requirements for style Q1002.",
    form: {
      name: "Your Name *", company: "Company Name", email: "Email *", phone: "Phone *", country: "Country / Region",
      product: "Product Interest", quantity: "Estimated Order Quantity", message: "Message *", privacy: "I agree to the Privacy Policy.",
      submit: "Submit Inquiry", sending: "Sending…", success: "Thank you. Your inquiry has been sent and our team will reply within one business day.",
      error: "We could not send your inquiry. Please try again or contact us by email.",
    },
    partnerTitle: "Why Partner with Marrant?",
    partnerPoints: ["Leather goods development and manufacturing", "Flexible private-label customization", "Quality control throughout production", "Support from sample to shipment"],
    contactTitle: "Contact Information",
    linksTitle: "Continue Planning Your Collection",
    linksCopy: "Compare small leather goods, review our manufacturing process or send your wholesale requirements.",
    links: [
      { href: "/products", label: "Browse all collections", description: "Compare wallets, cases, travel bags and other leather goods." },
      { href: "/about#production", label: "See our production", description: "Understand the process and quality checkpoints behind an order." },
      { href: "/blog", label: "Read sourcing insights", description: "Prepare materials, construction and supplier requirements." },
      { href: "/contact#inquiry", label: "Start an inquiry", description: "Send your quantity, market and customization needs." },
    ],
  },
  zh: {
    home: "首页",
    products: "产品系列",
    category: "美甲工具收纳套",
    name: "批发头层牛皮压花美甲剪收纳袋",
    kicker: "批发真皮工具收纳袋 · 款号 Q1002",
    title: <>批发头层牛皮压花<br />美甲剪收纳袋</>,
    intro: "面向进口商、批发商、电商品牌与贴牌项目的头层牛皮美甲工具收纳袋，采用压花皮面、分层收纳、无里布结构与按扣翻盖闭合。",
    request: "获取批发报价",
    chat: "沟通采购需求",
    galleryLabel: "Q1002 头层牛皮压花美甲剪收纳袋产品图片",
    showImage: "查看图片",
    factsLabel: "产品信息概览",
    facts: [
      ["款号", "Q1002"], ["材质", "头层牛皮"], ["所列尺寸", "7.4 × 0.5 × 10.8 cm"],
      ["颜色", "咖啡色"], ["里布", "无里布"], ["特点", "分层工具收纳"],
    ],
    specifications: "批发产品规格",
    specNote: "产品名称、材质、里布、尺寸、颜色与定制选项来自你提供的 Q1002 产品资料，结构根据所提供图片整理。MOQ、包装与交期具体请联系我们咨询。图片中的剪刀、指甲钳及美甲工具仅用于展示，不包含在产品内。",
    specs: [
      { left: ["款号", "Q1002"], right: ["所提供尺寸", "7.4 × 0.5 × 10.8 cm（2.9 × 0.2 × 4.3 in）"] },
      { left: ["材质", "头层牛皮"], right: ["里布", "无里布"] },
      { left: ["SKU 颜色", "咖啡色"], right: ["表面效果", "图片展示花卉压花"] },
      { left: ["结构", "分层口袋与按扣翻盖闭合"], right: ["用途", "小型美甲工具收纳"] },
      { left: ["包装内容", "仅收纳袋；不含展示工具"], right: ["MOQ / 包装 / 生产周期", "具体请联系我们咨询"] },
    ],
    materialTitle: "材料与结构",
    materialName: "压花头层牛皮",
    materialCopy: "所提供图片展示咖啡色花卉压花皮面、车缝边缘及无里布的皮革绒面内侧。具体皮料、压花深度、边缘处理与五金颜色将在打样阶段复核。",
    colorsTitle: "所提供 SKU 颜色",
    colorsCopy: "产品资料列出咖啡色为当前颜色。可结合采购数量、参考色与最终皮料评估定制颜色开发。",
    customizationTitle: "OEM / ODM 定制",
    packagingTitle: "批发包装选项",
    processTitle: "订单流程",
    factoryKicker: "到访玛轮特",
    factoryTitle: "在广州确认您的小皮具项目",
    factoryCopy: "欢迎进口商、批发商与品牌团队现场确认皮料、压花、口袋结构、标识工艺、五金与品质检验要求。",
    factoryPoints: ["确认皮料与压花效果", "核对口袋结构与五金", "沟通品牌贴牌包装"],
    factoryCta: "预约工厂参观",
    faqTitle: "批发采购常见问题",
    faqs: [
      ["产品尺寸是多少？", "所提供尺寸为 7.4 × 0.5 × 10.8 cm。"],
      ["收纳袋可以放哪些物品？", "图片展示分层口袋，可用于小型美甲工具收纳；最终适配情况取决于工具尺寸，图片中的工具不包含在产品内。"],
      ["产品是否有里布？", "所提供资料注明无里布，图片也展示了皮革绒面内侧。"],
      ["可以调整标识、颜色或口袋结构吗？", "收到品牌图稿、采购数量及工具尺寸后，可评估标识、颜色、五金、里布、包装与结构调整。"],
      ["批发起订量是多少？", "MOQ、包装、打样周期与大货周期需在皮料、表面效果、定制项目及数量确定后确认。"],
    ],
    inquiryTitle: "获取批发报价",
    inquiryCopy: "请提供款号 Q1002 的预计数量、目标市场、工具尺寸与定制要求。",
    form: {
      name: "姓名 *", company: "公司名称", email: "电子邮箱 *", phone: "联系电话 *", country: "国家 / 地区",
      product: "意向产品", quantity: "预计采购数量", message: "需求说明 *", privacy: "我同意将以上信息用于本次采购咨询。",
      submit: "提交采购需求", sending: "正在发送…", success: "提交成功，我们将在一个工作日内回复。",
      error: "暂时无法发送，请稍后重试或直接通过邮箱联系我们。",
    },
    partnerTitle: "为什么选择玛轮特？",
    partnerPoints: ["真皮产品开发与制造", "灵活的品牌贴牌定制", "生产过程品质管控", "从样品到出货持续支持"],
    contactTitle: "联系方式",
    linksTitle: "继续规划您的产品系列",
    linksCopy: "对比更多小皮具、了解生产流程或提交批发采购需求。",
    links: [
      { href: "/zh/products", label: "浏览全部产品", description: "对比钱包、收纳套、旅行包与其他真皮产品。" },
      { href: "/zh/about#production", label: "了解生产流程", description: "查看订单生产与品质检验环节。" },
      { href: "/zh/blog", label: "阅读采购内容", description: "明确材料、结构与供应商评估要求。" },
      { href: "/zh/contact#inquiry", label: "获取定制报价", description: "提供采购数量、目标市场与定制需求。" },
    ],
  },
} as const;

const crazyHorseScissorsPouchContent = {
  en: {
    ...manicurePouchContent.en,
    category: "Desk & Lifestyle / Pen Cases",
    name: "Wholesale Crazy Horse Leather Scissors Storage Pouch",
    kicker: "Wholesale Leather Tool Pouch · Style No. Q1003",
    title: <>Wholesale Crazy Horse Leather<br />Scissors Storage Pouch</>,
    intro: "A coffee-colored top-grain cowhide pouch with a vintage crazy horse finish, layered storage pockets, an unlined interior and snap-flap closure for scissors, manicure tools and private-label desk-and-lifestyle collections.",
    galleryLabel: "Style Q1003 crazy horse leather scissors storage pouch image gallery",
    facts: [
      ["Style No.", "Q1003"], ["Material", "Top-grain cowhide"], ["Size", "21 × 8 × 8 cm"],
      ["Color", "Coffee"], ["Lining", "Unlined"], ["Feature", "Layered tool storage"],
    ],
    specNote: "Style Q1003 is designed for organized scissors and small-tool storage. MOQ, packaging and lead times are confirmed through direct consultation. Scissors, clippers and manicure tools are display props and are not included.",
    specs: [
      { left: ["Style No.", "Q1003"], right: ["Size", "21 × 8 × 8 cm (8.3 × 3.1 × 3.1 in)"] },
      { left: ["Material", "Top-grain cowhide"], right: ["Lining", "Unlined"] },
      { left: ["Color", "Coffee"], right: ["Surface", "Crazy horse finish"] },
      { left: ["Construction", "Layered pockets with snap-flap closure"], right: ["Use", "Scissors and small-tool storage"] },
      { left: ["Included", "Pouch only; tools not included"], right: ["MOQ / Packaging / Lead Time", "Contact us for details"] },
    ],
    materialName: "Crazy Horse Top-Grain Cowhide",
    materialCopy: "Top-grain cowhide gives the pouch a coffee-colored crazy horse surface with natural tonal variation. Stitched edges, an unlined suede-side interior, layered pockets and an antique-tone snap create a compact, practical construction. Leather selection, edge details and hardware color are reconfirmed during sampling.",
    colorsTitle: "Existing SKU Color",
    colorsCopy: "Coffee is the current SKU color. Natural tone and pull-up variation are characteristic of the crazy horse finish; custom color development can be evaluated against your quantity and color reference.",
    factoryTitle: "Review Your Desk & Lifestyle Project in Guangzhou",
    factoryCopy: "Importers, distributors and brand teams can review leather finish, pocket layout, logo applications, hardware and quality checkpoints with our product team.",
    factoryPoints: ["Review leather and surface finish", "Confirm pocket layout and hardware", "Discuss private-label packaging"],
    faqs: [
      ["What are the dimensions?", "The listed dimensions are 21 × 8 × 8 cm."],
      ["What can the pouch hold?", "Layered pockets organize scissors and small manicure tools. Final fit depends on your tool dimensions; the display tools are not included."],
      ["Is the pouch lined?", "The pouch is unlined, leaving the suede side of the leather visible inside."],
      ["Can we change the logo, color or pocket layout?", "Logo, color, hardware, lining, packaging and layout adjustments can be evaluated after the artwork, quantity and tool-size requirements are reviewed."],
      ["What are the MOQ and lead time?", "MOQ, packaging, sample timing and production lead time are confirmed after the material, finish, customization and quantity requirements are finalized."],
    ],
    inquiryCopy: "Share your quantity, target market, tool dimensions and customization requirements for style Q1003.",
    linksCopy: "Compare desk and lifestyle products, review our manufacturing process or send your wholesale requirements.",
    links: [
      { href: "/products?category=desk-lifestyle#products-index", label: "Browse desk & lifestyle products", description: "Compare pen cases, desk accessories and other leather lifestyle goods." },
      ...manicurePouchContent.en.links.slice(1),
    ],
  },
  zh: {
    ...manicurePouchContent.zh,
    category: "桌面与生活用品 / 笔袋",
    name: "批发头层牛皮疯马皮剪刀收纳袋",
    kicker: "批发真皮工具收纳袋 · 款号 Q1003",
    title: <>批发头层牛皮疯马皮<br />剪刀收纳袋</>,
    intro: "面向进口商、批发商、电商品牌与贴牌项目的咖啡色头层牛皮疯马皮剪刀收纳袋，采用复古皮面、分层收纳、无里布结构与按扣翻盖闭合，适合剪刀、美甲工具及桌面生活用品系列。",
    galleryLabel: "Q1003 头层牛皮疯马皮剪刀收纳袋产品图片",
    facts: [
      ["款号", "Q1003"], ["材质", "头层牛皮"], ["尺寸", "21 × 8 × 8 cm"],
      ["颜色", "咖啡色"], ["里布", "无里布"], ["特点", "分层工具收纳"],
    ],
    specNote: "款号 Q1003 采用分层结构，可用于剪刀及小型工具收纳。MOQ、包装与生产周期具体请联系我们咨询。剪刀、指甲钳及美甲工具仅为展示道具，不包含在产品内。",
    specs: [
      { left: ["款号", "Q1003"], right: ["尺寸", "21 × 8 × 8 cm（8.3 × 3.1 × 3.1 in）"] },
      { left: ["材质", "头层牛皮"], right: ["里布", "无里布"] },
      { left: ["颜色", "咖啡色"], right: ["表面效果", "疯马皮复古效果"] },
      { left: ["结构", "分层口袋与按扣翻盖闭合"], right: ["用途", "剪刀及小型工具收纳"] },
      { left: ["包装内容", "仅收纳袋；不含展示工具"], right: ["MOQ / 包装 / 生产周期", "具体请联系我们咨询"] },
    ],
    materialName: "头层牛皮疯马皮",
    materialCopy: "头层牛皮呈现咖啡色疯马皮复古质感与自然色泽变化。车缝边缘、无里布的皮革绒面内侧、分层口袋与复古色按扣组成紧凑实用的收纳结构。具体皮料、边缘处理与五金颜色将在打样阶段复核。",
    colorsTitle: "现有 SKU 颜色",
    colorsCopy: "咖啡色为当前 SKU 颜色。疯马皮的自然色泽与拉伸变色属于该表面效果特征；可结合采购数量与参考色评估定制颜色开发。",
    factoryTitle: "在广州确认您的桌面与生活用品项目",
    factoryCopy: "欢迎进口商、批发商与品牌团队现场确认皮料效果、口袋结构、标识工艺、五金与品质检验要求。",
    factoryPoints: ["确认皮料与表面效果", "核对口袋结构与五金", "沟通品牌贴牌包装"],
    faqs: [
      ["产品尺寸是多少？", "产品尺寸为 21 × 8 × 8 cm。"],
      ["收纳袋可以放哪些物品？", "分层口袋可用于剪刀及小型美甲工具收纳；最终适配情况取决于工具尺寸，展示工具不包含在产品内。"],
      ["产品是否有里布？", "产品采用无里布结构，内部保留皮革绒面。"],
      ["可以调整标识、颜色或口袋结构吗？", "收到品牌图稿、采购数量及工具尺寸后，可评估标识、颜色、五金、里布、包装与结构调整。"],
      ["MOQ 和交期是多少？", "MOQ、包装、打样周期与大货周期需在皮料、表面效果、定制项目及数量确定后确认。"],
    ],
    inquiryCopy: "请提供款号 Q1003 的预计数量、目标市场、工具尺寸与定制要求。",
    linksCopy: "对比桌面与生活用品、了解生产流程或提交批发采购需求。",
    links: [
      { href: "/zh/products?category=desk-lifestyle#products-index", label: "浏览桌面与生活用品", description: "对比笔袋、桌面配件与其他真皮生活用品。" },
      ...manicurePouchContent.zh.links.slice(1),
    ],
  },
} as const;

const multipurposePenCaseContent = {
  en: {
    home: "Home",
    products: "Products",
    category: "Pen Cases",
    name: "Wholesale Top-Grain Leather Multipurpose Pen Case",
    kicker: "Wholesale Leather Pen Case · Style No. Q1004",
    title: <>Wholesale Top-Grain Leather<br />Multipurpose Pen Case</>,
    intro: "A structured top-grain cowhide zipper pouch sized for pens, stationery and compact daily tools, with a wide rectangular profile and private-label customization options.",
    request: "Request Wholesale Quote",
    chat: "Discuss your order",
    galleryLabel: "Style Q1004 top-grain leather multipurpose pen case image gallery",
    showImage: "Show image",
    factsLabel: "Product information overview",
    facts: [
      ["Style No.", "Q1004"], ["Material", "Top-grain cowhide"], ["Size", "21 × 8 × 8 cm"],
      ["Colors", "5 options"], ["Lining", "Unlined"], ["Closure", "Top zipper"],
    ],
    specifications: "Wholesale Product Specifications",
    specNote: "Style Q1004 uses top-grain cowhide with an unlined, structured zipper construction. MOQ, packaging and production lead time are confirmed through direct consultation. Pens and other display props are not included.",
    specs: [
      { left: ["Style No.", "Q1004"], right: ["Size", "21 × 8 × 8 cm (8.3 × 3.1 × 3.1 in)"] },
      { left: ["Material", "Top-grain cowhide"], right: ["Lining", "Unlined"] },
      { left: ["Color", "Black / Coffee / Burgundy / Dark Coffee / Blue"], right: ["Closure", "Top zipper with leather pull"] },
      { left: ["Construction", "Rectangular gusseted pouch"], right: ["Use", "Pens, stationery and compact tools"] },
      { left: ["Included", "Pen case only; display props not included"], right: ["MOQ / Packaging / Lead Time", "Contact us for details"] },
    ],
    materialTitle: "Material & Construction",
    materialName: "Top-Grain Cowhide",
    materialCopy: "A structured top-grain cowhide body, stitched seams, full-length metal zipper and riveted leather pull create a durable, practical form. Final leather finish, edge treatment, zipper tone and construction details are reconfirmed during sampling.",
    colorsTitle: "Existing SKU Colors",
    colorsCopy: "Existing SKU colors are black, coffee, burgundy, dark coffee and blue. Final color standards and availability are reconfirmed before sampling.",
    customizationTitle: "OEM / ODM Customization",
    packagingTitle: "Wholesale Packaging",
    processTitle: "Order Process",
    factoryKicker: "Visit Marrant",
    factoryTitle: "Review Your Desk Accessories Project in Guangzhou",
    factoryCopy: "Importers, distributors and brand teams can review leather, zipper hardware, construction, logo applications and quality checkpoints with our product team.",
    factoryPoints: ["Review leather and color standards", "Confirm zipper and construction details", "Discuss private-label packaging"],
    factoryCta: "Plan a Factory Visit",
    faqTitle: "Wholesale FAQs",
    faqs: [
      ["What are the dimensions?", "The dimensions are 21 × 8 × 8 cm."],
      ["What can style Q1004 hold?", "Its roomy format suits pens, stationery and compact daily tools. Final fit depends on the dimensions of your intended contents; display props are not included."],
      ["Is the pen case lined?", "Style Q1004 has an unlined construction."],
      ["Which colors are available?", "Existing SKU colors are black, coffee, burgundy, dark coffee and blue. Final standards are confirmed before sampling."],
      ["Can the logo, hardware or packaging be customized?", "Logo, color, hardware, lining and packaging can be evaluated after the artwork, quantity and order requirements are reviewed."],
    ],
    inquiryTitle: "Request a Wholesale Quote",
    inquiryCopy: "Share your quantity, target market and customization requirements for style Q1004.",
    form: {
      name: "Your Name *", company: "Company Name", email: "Email *", phone: "Phone *", country: "Country / Region",
      product: "Product Interest", quantity: "Estimated Order Quantity", message: "Message *", privacy: "I agree to the Privacy Policy.",
      submit: "Submit Inquiry", sending: "Sending…", success: "Thank you. Your inquiry has been sent and our team will reply within one business day.",
      error: "We could not send your inquiry. Please try again or contact us by email.",
    },
    partnerTitle: "Why Partner with Marrant?",
    partnerPoints: ["Leather goods development and manufacturing", "Flexible private-label customization", "Quality control throughout production", "Support from sample to shipment"],
    contactTitle: "Contact Information",
    linksTitle: "Continue Planning Your Collection",
    linksCopy: "Compare desk and lifestyle accessories, review our manufacturing process or send your wholesale requirements.",
    links: [
      { href: "/products?category=desk-lifestyle#products-index", label: "Browse desk & lifestyle products", description: "Compare pen cases and other leather desk accessories." },
      { href: "/about#production", label: "See our production", description: "Understand the process and quality checkpoints behind an order." },
      { href: "/blog", label: "Read sourcing insights", description: "Prepare materials, construction and supplier requirements." },
      { href: "/contact#inquiry", label: "Start an inquiry", description: "Send your quantity, market and customization needs." },
    ],
  },
  zh: {
    home: "首页",
    products: "产品系列",
    category: "笔袋",
    name: "批发头层牛皮多功能笔袋",
    kicker: "批发真皮笔袋 · 款号 Q1004",
    title: <>批发头层牛皮<br />多功能笔袋</>,
    intro: "面向进口商、批发商、电商品牌与贴牌项目的头层牛皮多功能笔袋，采用立体长方形包身、顶部拉链闭合，可用于钢笔、文具与小型日用工具收纳。",
    request: "获取批发报价",
    chat: "沟通采购需求",
    galleryLabel: "Q1004 头层牛皮多功能笔袋产品图片",
    showImage: "查看图片",
    factsLabel: "产品信息概览",
    facts: [
      ["款号", "Q1004"], ["材质", "头层牛皮"], ["尺寸", "21 × 8 × 8 cm"],
      ["颜色", "5 种选项"], ["里布", "无里布"], ["闭合方式", "顶部拉链"],
    ],
    specifications: "批发产品规格",
    specNote: "Q1004 采用头层牛皮、无里布与立体拉链结构。MOQ、包装与生产周期具体请联系我们咨询。钢笔及其他展示道具不包含在产品内。",
    specs: [
      { left: ["款号", "Q1004"], right: ["尺寸", "21 × 8 × 8 cm（8.3 × 3.1 × 3.1 in）"] },
      { left: ["材质", "头层牛皮"], right: ["里布", "无里布"] },
      { left: ["颜色", "黑色 / 咖啡色 / 酒红色 / 深咖啡色 / 蓝色"], right: ["闭合方式", "顶部拉链配皮质拉手"] },
      { left: ["结构", "立体长方形包身"], right: ["用途", "钢笔、文具与小型工具收纳"] },
      { left: ["包装内容", "仅笔袋；不含展示道具"], right: ["MOQ / 包装 / 生产周期", "具体请联系我们咨询"] },
    ],
    materialTitle: "材料与结构",
    materialName: "头层牛皮",
    materialCopy: "立体头层牛皮包身搭配车缝接缝、通长金属拉链与铆钉固定的皮质拉手，兼顾耐用性与实用外形。具体皮面效果、边缘处理、拉链颜色与结构细节将在打样阶段复核。",
    colorsTitle: "现有SKU颜色",
    colorsCopy: "现有 SKU 颜色包括黑色、咖啡色、酒红色、深咖啡色和蓝色；打样前需再次确认最终色板与可供情况。",
    customizationTitle: "OEM / ODM 定制",
    packagingTitle: "批发包装选项",
    processTitle: "订单流程",
    factoryKicker: "到访玛轮特",
    factoryTitle: "在广州确认您的桌面用品项目",
    factoryCopy: "欢迎进口商、批发商与品牌团队现场确认皮料、拉链五金、结构、标识工艺与品质检验要求。",
    factoryPoints: ["确认皮料与颜色标准", "核对拉链与结构细节", "沟通品牌贴牌包装"],
    factoryCta: "预约工厂参观",
    faqTitle: "批发采购常见问题",
    faqs: [
      ["产品尺寸是多少？", "产品尺寸为 21 × 8 × 8 cm。"],
      ["Q1004 可以收纳哪些物品？", "大容量造型适合收纳钢笔、文具与小型日用工具；最终适配情况取决于拟装物品尺寸，展示道具不包含在产品内。"],
      ["产品是否有里布？", "Q1004 采用无里布结构。"],
      ["有哪些现有颜色？", "现有 SKU 颜色包括黑色、咖啡色、酒红色、深咖啡色和蓝色，打样前确认最终色板。"],
      ["可以定制标识、五金或包装吗？", "收到品牌图稿、采购数量与订单要求后，可评估标识、颜色、五金、里布与包装定制。"],
    ],
    inquiryTitle: "获取批发报价",
    inquiryCopy: "请提供款号 Q1004 的预计数量、目标市场与定制要求。",
    form: {
      name: "姓名 *", company: "公司名称", email: "电子邮箱 *", phone: "联系电话 *", country: "国家 / 地区",
      product: "意向产品", quantity: "预计采购数量", message: "需求说明 *", privacy: "我同意将以上信息用于本次采购咨询。",
      submit: "提交采购需求", sending: "正在发送…", success: "提交成功，我们将在一个工作日内回复。",
      error: "暂时无法发送，请稍后重试或直接通过邮箱联系我们。",
    },
    partnerTitle: "为什么选择玛轮特？",
    partnerPoints: ["真皮产品开发与制造", "灵活的品牌贴牌定制", "生产过程品质管控", "从样品到出货持续支持"],
    contactTitle: "联系方式",
    linksTitle: "继续规划您的产品系列",
    linksCopy: "对比桌面与生活用品、了解生产流程或提交批发采购需求。",
    links: [
      { href: "/zh/products?category=desk-lifestyle#products-index", label: "浏览桌面与生活用品", description: "对比笔袋与其他真皮桌面用品。" },
      { href: "/zh/about#production", label: "了解生产流程", description: "查看订单生产与品质检验环节。" },
      { href: "/zh/blog", label: "阅读采购内容", description: "明确材料、结构与供应商评估要求。" },
      { href: "/zh/contact#inquiry", label: "获取定制报价", description: "提供采购数量、目标市场与定制需求。" },
    ],
  },
} as const;

const notebookCoverContent = {
  en: {
    ...multipurposePenCaseContent.en,
    category: "Wallets & Small Leather Goods / Passport Holders",
    name: "Wholesale Crazy Horse Leather Notebook Cover",
    kicker: "Wholesale Leather Notebook Cover · Style No. Q1005",
    title: <>Wholesale Crazy Horse Leather<br />Notebook Cover Organizer</>,
    intro: "A compact top-grain cowhide notebook cover with a vintage crazy horse finish, card pocket, pen loop and notebook sleeve for travel stationery and private-label small leather goods collections.",
    galleryLabel: "Style Q1005 crazy horse leather notebook cover image gallery",
    facts: [["Style No.", "Q1005"], ["Material", "Top-grain cowhide"], ["Size", "11 × 2 × 16 cm"], ["Colors", "Coffee / Brown"], ["Lining", "Unlined"], ["Feature", "Card pocket and pen loop"]],
    specNote: "Style Q1005 combines notebook protection with organized card and pen storage. MOQ, packaging and production lead time are confirmed through direct consultation. Notebook, pen and cards are display props and are not included.",
    specs: [
      { left: ["Style No.", "Q1005"], right: ["Size", "11 × 2 × 16 cm (4.3 × 0.8 × 6.3 in)"] },
      { left: ["Material", "Top-grain cowhide"], right: ["Lining", "Unlined"] },
      { left: ["Color", "Coffee / Brown"], right: ["Surface", "Crazy horse finish"] },
      { left: ["Construction", "Card pocket, pen loop and notebook sleeve"], right: ["Use", "Travel notebook and stationery organization"] },
      { left: ["Included", "Cover only; display props not included"], right: ["MOQ / Packaging / Lead Time", "Contact us for details"] },
    ],
    materialName: "Crazy Horse Top-Grain Cowhide",
    materialCopy: "Top-grain cowhide, contrast stitching and an unlined suede-side center form a slim notebook organizer. A curved card pocket, leather pen loop and right-side notebook sleeve keep daily stationery together, while the crazy horse finish develops natural tonal variation.",
    colorsTitle: "Existing SKU Colors",
    colorsCopy: "Coffee and brown are the current SKU colors. Final leather tone and natural surface variation are reconfirmed before sampling.",
    factoryTitle: "Review Your Passport Holder & Notebook Cover Project in Guangzhou",
    factoryCopy: "Importers, distributors and brand teams can review leather finish, pocket layout, pen-loop sizing, logo applications and quality checkpoints with our product team.",
    factoryPoints: ["Review leather and color standards", "Confirm pocket and pen-loop layout", "Discuss private-label packaging"],
    faqs: [
      ["What are the dimensions?", "The dimensions are 11 × 2 × 16 cm."],
      ["What can style Q1005 organize?", "It combines a notebook sleeve, card pocket and pen loop. Final fit depends on the dimensions of your intended notebook and accessories."],
      ["Are the notebook, pen and cards included?", "No. Style Q1005 includes the leather cover only; all stationery and cards are display props."],
      ["Which colors are available?", "Coffee and brown are the current SKU colors. Final leather tone is confirmed before sampling."],
      ["Can the logo, color or layout be customized?", "Logo, color, hardware, lining, packaging and layout changes can be evaluated after the artwork, quantity and size requirements are reviewed."],
    ],
    inquiryCopy: "Share your quantity, target market, notebook dimensions and customization requirements for style Q1005.",
    linksCopy: "Compare wallets and small leather goods, review our manufacturing process or send your wholesale requirements.",
    links: [{ href: "/products?category=small-leather-goods#products-index", label: "Browse wallets & small leather goods", description: "Compare passport holders, wallets, card holders and other compact leather goods." }, ...multipurposePenCaseContent.en.links.slice(1)],
  },
  zh: {
    ...multipurposePenCaseContent.zh,
    category: "钱包与小皮具 / 护照夹",
    name: "批发疯马皮笔记本保护套",
    kicker: "批发真皮笔记本保护套 · 款号 Q1005",
    title: <>批发疯马皮<br />笔记本保护套收纳夹</>,
    intro: "面向进口商、批发商、电商品牌与贴牌项目的头层牛皮笔记本保护套，采用疯马皮复古表面，配卡片口袋、笔插与笔记本套位，适合旅行文具及小皮具系列。",
    galleryLabel: "Q1005 疯马皮笔记本保护套产品图片",
    facts: [["款号", "Q1005"], ["材质", "头层牛皮"], ["尺寸", "11 × 2 × 16 cm"], ["颜色", "咖啡色 / 棕色"], ["里布", "无里布"], ["特点", "卡片口袋与笔插"]],
    specNote: "Q1005 将笔记本保护与卡片、笔具收纳结合。MOQ、包装与生产周期具体请联系我们咨询。笔记本、笔与卡片仅为展示道具，不包含在产品内。",
    specs: [
      { left: ["款号", "Q1005"], right: ["尺寸", "11 × 2 × 16 cm（4.3 × 0.8 × 6.3 in）"] },
      { left: ["材质", "头层牛皮"], right: ["里布", "无里布"] },
      { left: ["颜色", "咖啡色 / 棕色"], right: ["表面效果", "疯马皮复古效果"] },
      { left: ["结构", "卡片口袋、笔插与笔记本套位"], right: ["用途", "旅行笔记本与文具收纳"] },
      { left: ["包装内容", "仅保护套；不含展示道具"], right: ["MOQ / 包装 / 生产周期", "具体请联系我们咨询"] },
    ],
    materialName: "疯马皮头层牛皮",
    materialCopy: "头层牛皮、撞色车线与无里布的皮革绒面中脊组成轻薄笔记本收纳夹。弧形卡片口袋、皮质笔插与右侧笔记本套位便于集中收纳日常文具，疯马皮表面呈现自然色泽变化。",
    colorsTitle: "现有 SKU 颜色",
    colorsCopy: "咖啡色与棕色为当前 SKU 颜色；打样前需再次确认最终皮料色泽与自然表面变化。",
    factoryTitle: "在广州确认您的护照夹与笔记本保护套项目",
    factoryCopy: "欢迎进口商、批发商与品牌团队现场确认皮料效果、口袋结构、笔插尺寸、标识工艺与品质检验要求。",
    factoryPoints: ["确认皮料与颜色标准", "核对口袋与笔插结构", "沟通品牌贴牌包装"],
    faqs: [
      ["产品尺寸是多少？", "产品尺寸为 11 × 2 × 16 cm。"],
      ["Q1005 可以收纳哪些物品？", "产品配有笔记本套位、卡片口袋与笔插；最终适配情况取决于拟装笔记本与配件尺寸。"],
      ["笔记本、笔和卡片是否包含？", "不包含。Q1005 的包装内容仅为真皮保护套，文具与卡片均为展示道具。"],
      ["有哪些现有颜色？", "咖啡色与棕色为当前 SKU 颜色，打样前确认最终皮料色泽。"],
      ["可以定制标识、颜色或结构吗？", "收到品牌图稿、采购数量与尺寸要求后，可评估标识、颜色、五金、里布、包装与结构调整。"],
    ],
    inquiryCopy: "请提供款号 Q1005 的预计数量、目标市场、笔记本尺寸与定制要求。",
    linksCopy: "对比钱包与小皮具、了解生产流程或提交批发采购需求。",
    links: [{ href: "/zh/products?category=small-leather-goods#products-index", label: "浏览钱包与小皮具", description: "对比护照夹、钱包、卡包与其他小型真皮产品。" }, ...multipurposePenCaseContent.zh.links.slice(1)],
  },
} as const;

const penHolderContent = {
  en: {
    ...multipurposePenCaseContent.en,
    category: "Desk & Lifestyle",
    name: "Wholesale Top-Grain Leather Pen Holder",
    kicker: "Wholesale Leather Desk Accessory · Style No. Q1006",
    title: <>Wholesale Top-Grain Leather<br />Cylindrical Pen Holder</>,
    intro: "A cylindrical top-grain cowhide pen holder with an open top, stitched rim and stable round base for pens, pencils and compact desktop tools in branded desk-accessory collections.",
    galleryLabel: "Style Q1006 top-grain leather pen holder image gallery",
    facts: [["Style No.", "Q1006"], ["Material", "Top-grain cowhide"], ["Size", "8 × 9.6 cm"], ["Color", "Brown"], ["Lining", "Unlined"], ["Structure", "Cylindrical open-top holder"]],
    specNote: "Style Q1006 uses a compact open-top cylinder for organized desk storage. MOQ, packaging and production lead time are confirmed through direct consultation. Pens, pencils and tools are display props and are not included.",
    specs: [
      { left: ["Style No.", "Q1006"], right: ["Size", "8 × 9.6 cm (3.1 × 3.8 in)"] },
      { left: ["Material", "Top-grain cowhide"], right: ["Lining", "Unlined"] },
      { left: ["Color", "Brown"], right: ["Opening", "Open top"] },
      { left: ["Construction", "Cylindrical body with stitched rim and base"], right: ["Use", "Pens, pencils and compact desk tools"] },
      { left: ["Included", "Pen holder only; display props not included"], right: ["MOQ / Packaging / Lead Time", "Contact us for details"] },
    ],
    materialName: "Top-Grain Cowhide",
    materialCopy: "A top-grain cowhide wrap, reinforced stitched rim and stitched circular base create a clean cylindrical desk organizer. The unlined construction keeps the leather character visible and supports a compact, easy-access format.",
    colorsTitle: "Existing SKU Color",
    colorsCopy: "Brown is the current SKU color. Final leather tone and surface variation are reconfirmed before sampling.",
    factoryTitle: "Review Your Leather Desk Accessory Project in Guangzhou",
    factoryCopy: "Importers, distributors and brand teams can review leather, cylinder dimensions, stitching, logo applications and quality checkpoints with our product team.",
    factoryPoints: ["Review leather and color standards", "Confirm dimensions and stitching", "Discuss private-label packaging"],
    faqs: [["What are the dimensions?", "The listed size is 8 × 9.6 cm."], ["What can style Q1006 hold?", "The open cylindrical format is designed for pens, pencils and compact desktop tools. Final fit depends on the intended contents."], ["Is the pen holder lined?", "Style Q1006 has an unlined construction."], ["Are the displayed tools included?", "No. The packaging contains the leather pen holder only."], ["Can the logo, color or packaging be customized?", "Logo, color, construction details, lining and packaging can be evaluated after the artwork, quantity and order requirements are reviewed."]],
    inquiryCopy: "Share your quantity, target market and customization requirements for style Q1006.",
  },
  zh: {
    ...multipurposePenCaseContent.zh,
    category: "桌面与生活用品",
    name: "批发头层牛皮圆筒笔筒",
    kicker: "批发真皮桌面用品 · 款号 Q1006",
    title: <>批发头层牛皮<br />圆筒笔筒</>,
    intro: "面向进口商、批发商、电商品牌与贴牌项目的头层牛皮圆筒笔筒，采用开放式筒口、车缝包边与圆形底座，可收纳钢笔、铅笔及小型桌面工具。",
    galleryLabel: "Q1006 头层牛皮圆筒笔筒产品图片",
    facts: [["款号", "Q1006"], ["材质", "头层牛皮"], ["尺寸", "8 × 9.6 cm"], ["颜色", "棕色"], ["里布", "无里布"], ["结构", "开放式圆筒笔筒"]],
    specNote: "Q1006 采用紧凑开放式圆筒结构，便于桌面分类收纳。MOQ、包装与生产周期具体请联系我们咨询。钢笔、铅笔及工具仅为展示道具，不包含在产品内。",
    specs: [
      { left: ["款号", "Q1006"], right: ["尺寸", "8 × 9.6 cm（3.1 × 3.8 in）"] },
      { left: ["材质", "头层牛皮"], right: ["里布", "无里布"] },
      { left: ["颜色", "棕色"], right: ["开口", "开放式筒口"] },
      { left: ["结构", "圆筒包身配车缝包边与底座"], right: ["用途", "钢笔、铅笔与小型桌面工具收纳"] },
      { left: ["包装内容", "仅笔筒；不含展示道具"], right: ["MOQ / 包装 / 生产周期", "具体请联系我们咨询"] },
    ],
    materialName: "头层牛皮",
    materialCopy: "头层牛皮筒身搭配加固车缝包边与圆形车缝底座，形成简洁利落的桌面收纳造型。无里布结构保留皮革质感，开放式筒口便于随手取放。",
    colorsTitle: "现有 SKU 颜色",
    colorsCopy: "棕色为当前 SKU 颜色；打样前需再次确认最终皮料色泽与自然表面变化。",
    factoryTitle: "在广州确认您的真皮桌面用品项目",
    factoryCopy: "欢迎进口商、批发商与品牌团队现场确认皮料、筒身尺寸、车缝、标识工艺与品质检验要求。",
    factoryPoints: ["确认皮料与颜色标准", "核对尺寸与车缝细节", "沟通品牌贴牌包装"],
    faqs: [["产品尺寸是多少？", "产品所列尺寸为 8 × 9.6 cm。"], ["Q1006 可以收纳哪些物品？", "开放式圆筒结构适合钢笔、铅笔与小型桌面工具，最终适配情况取决于拟装物品。"], ["产品是否有里布？", "Q1006 采用无里布结构。"], ["展示工具是否包含？", "不包含，包装内容仅为真皮笔筒。"], ["可以定制标识、颜色或包装吗？", "收到品牌图稿、采购数量与订单要求后，可评估标识、颜色、结构、里布与包装定制。"]],
    inquiryCopy: "请提供款号 Q1006 的预计数量、目标市场与定制要求。",
  },
} as const;

const catchallTrayContent = {
  en: {
    ...multipurposePenCaseContent.en,
    category: "Desk & Lifestyle",
    name: "Wholesale Top-Grain Leather Folding Catchall Tray",
    kicker: "Wholesale Leather Valet Tray · Style No. Q1009",
    title: <>Wholesale Top-Grain Leather<br />Folding Catchall Tray</>,
    intro: "A fold-flat top-grain cowhide valet tray with four snap-fastened corners and an unlined suede-side interior for keys, cables and small everyday items.",
    galleryLabel: "Style Q1009 top-grain leather folding catchall tray image gallery",
    facts: [["Style No.", "Q1009"], ["Material", "Top-grain cowhide"], ["Size", "17.5 × 17.5 × 0.5 cm"], ["Color", "Coffee"], ["Lining", "Unlined"], ["Feature", "Fold-flat snap construction"]],
    specNote: "Style Q1009 folds flat and assembles through four corner snap fasteners for compact desk and travel storage. MOQ, packaging and production lead time are confirmed through direct consultation. Keys, cables and accessories are display props and are not included.",
    specs: [
      { left: ["Style No.", "Q1009"], right: ["Size", "17.5 × 17.5 × 0.5 cm (6.9 × 6.9 × 0.2 in)"] },
      { left: ["Material", "Top-grain cowhide"], right: ["Lining", "Unlined"] },
      { left: ["Color", "Coffee"], right: ["Closure", "Four corner snap fasteners"] },
      { left: ["Construction", "Fold-flat square panel with raised sides"], right: ["Use", "Keys, cables and small-item storage"] },
      { left: ["Included", "Tray only; display props not included"], right: ["MOQ / Packaging / Lead Time", "Contact us for details"] },
    ],
    materialName: "Top-Grain Cowhide",
    materialCopy: "A single top-grain cowhide panel uses four snap-fastened corners to form raised sides around an unlined suede-side interior. The fold-flat construction supports compact packing while the open tray shape keeps small daily items visible and accessible.",
    colorsTitle: "Existing SKU Color",
    colorsCopy: "Coffee is the current SKU color. Final leather tone, snap finish and natural surface variation are reconfirmed before sampling.",
    factoryTitle: "Review Your Leather Valet Tray Project in Guangzhou",
    factoryCopy: "Importers, distributors and brand teams can review leather, flat dimensions, snap hardware, logo applications and quality checkpoints with our product team.",
    factoryPoints: ["Review leather and color standards", "Confirm snap hardware and folded shape", "Discuss private-label packaging"],
    faqs: [["What are the dimensions?", "The flat listed dimensions are 17.5 × 17.5 × 0.5 cm."], ["How is style Q1009 assembled?", "Four corner snap fasteners join the edges to create the raised tray sides, and release so the panel can fold flat."], ["What can the tray hold?", "The open catchall format suits keys, cables and other small everyday items. Display accessories are not included."], ["Is the tray lined?", "Style Q1009 is unlined, leaving the suede side of the leather visible inside."], ["Can the logo, color or hardware be customized?", "Logo, color, snap finish, lining and packaging can be evaluated after the artwork, quantity and order requirements are reviewed."]],
    inquiryCopy: "Share your quantity, target market and customization requirements for style Q1009.",
  },
  zh: {
    ...multipurposePenCaseContent.zh,
    category: "桌面与生活用品",
    name: "批发头层牛皮折叠收纳托盘",
    kicker: "批发真皮桌面收纳盘 · 款号 Q1009",
    title: <>批发头层牛皮<br />折叠收纳托盘</>,
    intro: "面向进口商、批发商、电商品牌与贴牌项目的头层牛皮折叠收纳托盘，四角按扣组合成盘形，无里布皮革绒面内侧适合钥匙、线材及日常小物收纳。",
    galleryLabel: "Q1009 头层牛皮折叠收纳托盘产品图片",
    facts: [["款号", "Q1009"], ["材质", "头层牛皮"], ["尺寸", "17.5 × 17.5 × 0.5 cm"], ["颜色", "咖啡色"], ["里布", "无里布"], ["特点", "按扣折叠结构"]],
    specNote: "Q1009 可平铺收纳，并通过四角按扣组合成盘形，适合桌面与旅行小物整理。MOQ、包装与生产周期具体请联系我们咨询。钥匙、线材及配件仅为展示道具，不包含在产品内。",
    specs: [
      { left: ["款号", "Q1009"], right: ["尺寸", "17.5 × 17.5 × 0.5 cm（6.9 × 6.9 × 0.2 in）"] },
      { left: ["材质", "头层牛皮"], right: ["里布", "无里布"] },
      { left: ["颜色", "咖啡色"], right: ["闭合方式", "四角按扣组合"] },
      { left: ["结构", "方形平铺皮片与立体盘边"], right: ["用途", "钥匙、线材与日常小物收纳"] },
      { left: ["包装内容", "仅收纳盘；不含展示道具"], right: ["MOQ / 包装 / 生产周期", "具体请联系我们咨询"] },
    ],
    materialName: "头层牛皮",
    materialCopy: "单片头层牛皮通过四角按扣组合成立体盘边，内侧保留无里布的皮革绒面。可平铺结构便于紧凑包装，开放式盘形让日常小物一目了然并易于取放。",
    colorsTitle: "现有 SKU 颜色",
    colorsCopy: "咖啡色为当前 SKU 颜色；打样前需再次确认最终皮料色泽、按扣表面效果与自然表面变化。",
    factoryTitle: "在广州确认您的真皮桌面收纳盘项目",
    factoryCopy: "欢迎进口商、批发商与品牌团队现场确认皮料、平铺尺寸、按扣五金、标识工艺与品质检验要求。",
    factoryPoints: ["确认皮料与颜色标准", "核对按扣五金与折叠造型", "沟通品牌贴牌包装"],
    faqs: [["产品尺寸是多少？", "产品平铺尺寸为 17.5 × 17.5 × 0.5 cm。"], ["Q1009 如何组合？", "将四角按扣扣合即可形成盘边，解开按扣后可恢复平铺状态。"], ["收纳盘可以放哪些物品？", "开放式盘形适合钥匙、线材与其他日常小物，展示配件不包含在产品内。"], ["产品是否有里布？", "Q1009 采用无里布结构，内侧保留皮革绒面。"], ["可以定制标识、颜色或五金吗？", "收到品牌图稿、采购数量与订单要求后，可评估标识、颜色、按扣表面效果、里布与包装定制。"]],
    inquiryCopy: "请提供款号 Q1009 的预计数量、目标市场与定制要求。",
  },
} as const;

const compassPencilCaseContent = {
  en: {
    ...multipurposePenCaseContent.en,
    category: "Desk & Lifestyle / Pen Cases",
    name: "Wholesale Top-Grain Leather Compass Pencil Case",
    kicker: "Wholesale Leather Pencil Case · Style No. Q1008",
    title: <>Wholesale Top-Grain Leather<br />Compass Pencil Case</>,
    intro: "A zip-around top-grain cowhide pencil case with a compass motif, polyester lining, elastic pen loops and a mesh pocket for organized stationery storage.",
    galleryLabel: "Style Q1008 top-grain leather compass pencil case image gallery",
    facts: [["Style No.", "Q1008"], ["Material", "Top-grain cowhide"], ["Size", "18 × 10.5 × 2.5 cm"], ["Color", "Coffee"], ["Lining", "Polyester"], ["Closure", "Zip-around"]],
    specNote: "Style Q1008 combines a top-grain cowhide cover, polyester-lined interior, elastic pen loops and a mesh pocket in a zip-around format. MOQ, packaging and production lead time are confirmed through direct consultation. Pens, cards and other display props are not included.",
    specs: [
      { left: ["Style No.", "Q1008"], right: ["Size", "18 × 10.5 × 2.5 cm (7.1 × 4.1 × 1.0 in)"] },
      { left: ["Material", "Top-grain cowhide"], right: ["Lining", "Polyester"] },
      { left: ["Color", "Coffee"], right: ["Closure", "Zip-around closure"] },
      { left: ["Construction", "Elastic pen loops and mesh pocket"], right: ["Use", "Pens, pencils and stationery storage"] },
      { left: ["Included", "Pencil case only; display props not included"], right: ["MOQ / Packaging / Lead Time", "Contact us for details"] },
    ],
    materialName: "Top-Grain Cowhide & Polyester Lining",
    materialCopy: "A stitched top-grain cowhide exterior wraps around a polyester-lined organizer with elastic loops and a mesh pocket. The full perimeter zipper keeps the case compact when closed, while the flat-opening layout keeps writing tools visible and easy to access.",
    colorsTitle: "Existing SKU Color",
    colorsCopy: "Coffee is the current SKU color. Final leather tone, compass motif, zipper finish and natural surface variation are reconfirmed before sampling.",
    factoryTitle: "Review Your Leather Pencil Case Project in Guangzhou",
    factoryCopy: "Importers, distributors and brand teams can review leather, lining, zipper hardware, organizer layout, logo applications and quality checkpoints with our product team.",
    factoryPoints: ["Review leather and color standards", "Confirm lining, zipper and organizer layout", "Discuss private-label packaging"],
    faqs: [["What are the dimensions?", "The listed dimensions are 18 × 10.5 × 2.5 cm."], ["How is the interior organized?", "The polyester-lined interior includes elastic pen loops and a mesh pocket for writing tools and small stationery."], ["What is included?", "The packaging contains the leather pencil case only; pens, cards and other display props are not included."], ["Which color is available?", "Coffee is the current SKU color. Final color standards are confirmed before sampling."], ["Can the logo, color, hardware, lining or packaging be customized?", "These options can be evaluated after the artwork, quantity and order requirements are reviewed."]],
    inquiryCopy: "Share your quantity, target market and customization requirements for style Q1008.",
  },
  zh: {
    ...multipurposePenCaseContent.zh,
    category: "桌面与生活用品 / 笔袋",
    name: "批发头层牛皮罗盘拉链笔袋",
    kicker: "批发真皮笔袋 · 款号 Q1008",
    title: <>批发头层牛皮<br />罗盘拉链笔袋</>,
    intro: "面向进口商、批发商、电商品牌与贴牌项目的头层牛皮罗盘拉链笔袋，搭配涤纶里布、弹力笔插与网袋，便于分类收纳钢笔、铅笔及小型文具。",
    galleryLabel: "Q1008 头层牛皮罗盘拉链笔袋产品图片",
    facts: [["款号", "Q1008"], ["材质", "头层牛皮"], ["尺寸", "18 × 10.5 × 2.5 cm"], ["颜色", "咖啡色"], ["里布", "涤纶"], ["闭合方式", "环绕拉链"]],
    specNote: "Q1008 采用头层牛皮外层、涤纶里布、弹力笔插与网袋，并通过环绕拉链闭合。MOQ、包装与生产周期具体请联系我们咨询。钢笔、卡片及其他展示道具不包含在产品内。",
    specs: [
      { left: ["款号", "Q1008"], right: ["尺寸", "18 × 10.5 × 2.5 cm（7.1 × 4.1 × 1.0 in）"] },
      { left: ["材质", "头层牛皮"], right: ["里布", "涤纶"] },
      { left: ["颜色", "咖啡色"], right: ["闭合方式", "环绕拉链闭合"] },
      { left: ["结构", "弹力笔插与网袋"], right: ["用途", "钢笔、铅笔与文具收纳"] },
      { left: ["包装内容", "仅笔袋；不含展示道具"], right: ["MOQ / 包装 / 生产周期", "具体请联系我们咨询"] },
    ],
    materialName: "头层牛皮与涤纶里布",
    materialCopy: "车缝头层牛皮外层包覆涤纶内衬收纳结构，内部配置弹力笔插与网袋。环绕拉链让笔袋闭合后保持紧凑，完全打开时可清晰查看并取放书写工具。",
    colorsTitle: "现有SKU颜色",
    colorsCopy: "咖啡色为当前 SKU 颜色；打样前需再次确认最终皮料色泽、罗盘图案、拉链表面效果与自然表面变化。",
    factoryTitle: "在广州确认您的真皮笔袋项目",
    factoryCopy: "欢迎进口商、批发商与品牌团队现场确认皮料、里布、拉链五金、内部收纳结构、标识工艺与品质检验要求。",
    factoryPoints: ["确认皮料与颜色标准", "核对里布、拉链与内部结构", "沟通品牌贴牌包装"],
    faqs: [["产品尺寸是多少？", "产品所列尺寸为 18 × 10.5 × 2.5 cm。"], ["内部如何分类收纳？", "涤纶里布内侧配置弹力笔插与网袋，可收纳书写工具及小型文具。"], ["包装包含哪些物品？", "包装内容仅为真皮笔袋，钢笔、卡片及其他展示道具不包含在产品内。"], ["现有颜色是什么？", "当前 SKU 颜色为咖啡色，最终色板在打样前确认。"], ["可以定制标识、颜色、五金、里布或包装吗？", "收到品牌图稿、采购数量与订单要求后，可评估相关定制选项。"]],
    inquiryCopy: "请提供款号 Q1008 的预计数量、目标市场与定制要求。",
  },
} as const;

const embossedPenSleeveContent = {
  en: {
    ...multipurposePenCaseContent.en,
    category: "Desk & Lifestyle / Pen Cases",
    name: "Wholesale Embossed Top-Grain Leather Pen Sleeve",
    kicker: "Wholesale Leather Pen Sleeve · Style No. Q1010",
    title: <>Wholesale Embossed Top-Grain Leather<br />Pen Sleeve</>,
    intro: "A slim top-grain cowhide pen sleeve with floral embossing, stitched edges and a tuck-through flap closure, offered in two listed sizes for compact writing-tool storage.",
    galleryLabel: "Style Q1010 embossed top-grain leather pen sleeve image gallery",
    facts: [["Style No.", "Q1010"], ["Material", "Top-grain cowhide"], ["Sizes", "16.5 × 5 cm / 16.5 × 7 cm"], ["Color", "Brown"], ["Lining", "Unlined"], ["Closure", "Tuck-through flap"]],
    specNote: "Style Q1010 uses an unlined top-grain cowhide construction with floral embossing, stitched edges and a tuck-through flap closure. MOQ, packaging and production lead time are confirmed through direct consultation. Pens and other display props are not included.",
    specs: [
      { left: ["Style No.", "Q1010"], right: ["Size", "16.5 × 5 cm / 16.5 × 7 cm (6.5 × 2.0 in / 6.5 × 2.8 in)"] },
      { left: ["Material", "Top-grain cowhide"], right: ["Lining", "Unlined"] },
      { left: ["Color", "Brown"], right: ["Closure", "Tuck-through leather flap"] },
      { left: ["Construction", "Slim floral-embossed sleeve"], right: ["Use", "Pens and compact writing tools"] },
      { left: ["Included", "Pen sleeve only; display props not included"], right: ["MOQ / Packaging / Lead Time", "Contact us for details"] },
    ],
    materialName: "Floral-Embossed Top-Grain Cowhide",
    materialCopy: "Floral embossing covers the stitched top-grain cowhide sleeve, while the unlined interior keeps the construction slim. The extended leather flap folds over the opening and tucks beneath the front keeper for a hardware-free closure.",
    colorsTitle: "Existing SKU Color",
    colorsCopy: "Brown is the current SKU color. Final leather tone, embossing depth, thread color and edge finish are reconfirmed before sampling.",
    factoryTitle: "Review Your Embossed Pen Sleeve Project in Guangzhou",
    factoryCopy: "Importers, distributors and brand teams can review leather, embossing, size options, closure construction, logo applications and quality checkpoints with our product team.",
    factoryPoints: ["Review leather, color and embossing standards", "Confirm size and closure construction", "Discuss private-label packaging"],
    faqs: [["Which sizes are listed?", "The two listed sizes are 16.5 × 5 cm and 16.5 × 7 cm."], ["How does the sleeve close?", "The extended leather flap folds over the opening and tucks beneath the front leather keeper."], ["Is the pen sleeve lined?", "Style Q1010 has an unlined construction."], ["What is included?", "The packaging contains the leather pen sleeve only; pens and other display props are not included."], ["Can the logo, color, hardware, lining or packaging be customized?", "These options can be evaluated after the artwork, quantity and order requirements are reviewed."]],
    inquiryCopy: "Share your quantity, target market, size selection and customization requirements for style Q1010.",
  },
  zh: {
    ...multipurposePenCaseContent.zh,
    category: "桌面与生活用品 / 笔袋",
    name: "批发压花头层牛皮笔套",
    kicker: "批发真皮笔套 · 款号 Q1010",
    title: <>批发压花头层牛皮<br />笔套</>,
    intro: "面向进口商、批发商、电商品牌与贴牌项目的压花头层牛皮笔套，采用花卉压花、车缝包边与插入式翻盖闭合，提供两种所列尺寸用于便携收纳书写工具。",
    galleryLabel: "Q1010 压花头层牛皮笔套产品图片",
    facts: [["款号", "Q1010"], ["材质", "头层牛皮"], ["尺寸", "16.5 × 5 cm / 16.5 × 7 cm"], ["颜色", "棕色"], ["里布", "无里布"], ["闭合方式", "插入式翻盖"]],
    specNote: "Q1010 采用无里布头层牛皮结构，搭配花卉压花、车缝边缘与插入式翻盖闭合。MOQ、包装与生产周期具体请联系我们咨询。钢笔及其他展示道具不包含在产品内。",
    specs: [
      { left: ["款号", "Q1010"], right: ["尺寸", "16.5 × 5 cm / 16.5 × 7 cm（6.5 × 2.0 in / 6.5 × 2.8 in）"] },
      { left: ["材质", "头层牛皮"], right: ["里布", "无里布"] },
      { left: ["颜色", "棕色"], right: ["闭合方式", "皮质翻盖插入闭合"] },
      { left: ["结构", "轻薄花卉压花笔套"], right: ["用途", "钢笔与便携书写工具收纳"] },
      { left: ["包装内容", "仅笔套；不含展示道具"], right: ["MOQ / 包装 / 生产周期", "具体请联系我们咨询"] },
    ],
    materialName: "花卉压花头层牛皮",
    materialCopy: "花卉压花覆盖车缝头层牛皮笔套，无里布内侧让整体保持轻薄。加长皮质翻盖覆盖开口，并插入正面皮环完成无五金闭合。",
    colorsTitle: "现有SKU颜色",
    colorsCopy: "棕色为当前 SKU 颜色；打样前需再次确认最终皮料色泽、压花深度、线色与边缘处理。",
    factoryTitle: "在广州确认您的压花真皮笔套项目",
    factoryCopy: "欢迎进口商、批发商与品牌团队现场确认皮料、压花、尺寸选项、闭合结构、标识工艺与品质检验要求。",
    factoryPoints: ["确认皮料、颜色与压花标准", "核对尺寸与闭合结构", "沟通品牌贴牌包装"],
    faqs: [["产品有哪些尺寸？", "所列两种尺寸为 16.5 × 5 cm 和 16.5 × 7 cm。"], ["笔套如何闭合？", "加长皮质翻盖覆盖开口后插入正面皮环完成闭合。"], ["产品是否有里布？", "Q1010 采用无里布结构。"], ["包装包含哪些物品？", "包装内容仅为真皮笔套，钢笔及其他展示道具不包含在产品内。"], ["可以定制标识、颜色、五金、里布或包装吗？", "收到品牌图稿、采购数量与订单要求后，可评估相关定制选项。"]],
    inquiryCopy: "请提供款号 Q1010 的预计数量、目标市场、尺寸选择与定制要求。",
  },
} as const;

const gallery = {
  en: [
    { src: `${imageBase}/main.jpg`, alt: "SKU 8064 full-grain leather bifold wallet, main view" },
    { src: `${imageBase}/front.jpg`, alt: "SKU 8064 leather wallet angled front view" },
    { src: `${imageBase}/inside.jpg`, alt: "SKU 8064 bifold wallet interior with card slots and zip compartment" },
    { src: `${imageBase}/scenario.jpg`, alt: "SKU 8064 brown leather wallet in a tabletop setting" },
  ],
  zh: [
    { src: `${imageBase}/main.jpg`, alt: "8064 头层牛皮男士二折钱包主图" },
    { src: `${imageBase}/front.jpg`, alt: "8064 真皮钱包正面斜角展示" },
    { src: `${imageBase}/inside.jpg`, alt: "8064 二折钱包内部卡位与拉链收纳结构" },
    { src: `${imageBase}/scenario.jpg`, alt: "8064 棕色真皮钱包场景图" },
  ],
} as const;

const airTagGallery = {
  en: [
    { src: "/assets/products/leather-airtag-passport-wallet/colors.png", alt: "Wholesale genuine leather AirTag passport wallets in five SKU colors" },
    { src: "/assets/products/leather-airtag-passport-wallet/interior.png", alt: "Brown leather passport wallet interior with AirTag slot, RFID protection, card slots and zip pocket" },
    { src: "/assets/products/leather-airtag-passport-wallet/tracking.png", alt: "AirTag passport wallet continuous tracking feature illustration" },
    { src: "/assets/products/leather-airtag-passport-wallet/burgundy-front.png", alt: "Burgundy genuine leather passport holder wallet front view" },
  ],
  zh: [
    { src: "/assets/products/leather-airtag-passport-wallet/colors.png", alt: "批发真皮 AirTag 护照钱包五种 SKU 颜色" },
    { src: "/assets/products/leather-airtag-passport-wallet/interior.png", alt: "棕色真皮护照钱包内部 AirTag 槽、RFID 防护、卡位与拉链袋" },
    { src: "/assets/products/leather-airtag-passport-wallet/tracking.png", alt: "AirTag 护照钱包持续追踪功能说明" },
    { src: "/assets/products/leather-airtag-passport-wallet/burgundy-front.png", alt: "酒红色真皮护照夹钱包正面" },
  ],
} as const;

const compassGallery = {
  en: [
    { src: "/assets/products/leather-compass-wallet-1040/main.png", alt: "Wholesale top-grain leather compass bifold wallet, style 1040" },
    { src: "/assets/products/leather-compass-wallet-1040/interior.jpg", alt: "Style 1040 leather bifold wallet open interior with card, cash, photo and coin storage" },
    { src: "/assets/products/leather-compass-wallet-1040/dimensions.jpg", alt: "Style 1040 wallet dimensions 11 by 2 by 9 centimeters and weight 85 grams" },
    { src: "/assets/products/leather-compass-wallet-1040/lifestyle.jpg", alt: "Brown compass embossed cowhide bifold wallet in a vintage map setting" },
  ],
  zh: [
    { src: "/assets/products/leather-compass-wallet-1040/main.png", alt: "批发头层牛皮罗盘压花二折钱包款号 1040 主图" },
    { src: "/assets/products/leather-compass-wallet-1040/interior.jpg", alt: "1040 真皮二折钱包内部卡位、现金位、照片位与零钱位" },
    { src: "/assets/products/leather-compass-wallet-1040/dimensions.jpg", alt: "1040 钱包尺寸 11 × 2 × 9 厘米、重量 85 克" },
    { src: "/assets/products/leather-compass-wallet-1040/lifestyle.jpg", alt: "棕色罗盘压花头层牛皮二折钱包场景图" },
  ],
} as const;

const zipCoinWalletGallery = {
  en: [
    { src: "/assets/products/top-grain-zip-wallet-7042/coffee-front.webp", alt: "Coffee top-grain cowhide zip coin pocket bifold wallet, style 7042" },
    { src: "/assets/products/top-grain-zip-wallet-7042/black-front.webp", alt: "Black top-grain leather short bifold wallet with snap-tab closure" },
  ],
  zh: [
    { src: "/assets/products/top-grain-zip-wallet-7042/coffee-front.webp", alt: "款号 7042 咖啡色头层牛皮拉链零钱袋短款钱包" },
    { src: "/assets/products/top-grain-zip-wallet-7042/black-front.webp", alt: "黑色头层牛皮搭扣闭合男士短款二折钱包" },
  ],
} as const;

const cardHolderGallery = {
  en: [
    { src: "/assets/products/crazy-horse-leather-card-holder-1343/color-overview-logo-removed.png", alt: "Red, blue and green crazy horse leather card holders, style 1343, with supplier logo removed" },
    { src: "/assets/products/crazy-horse-leather-card-holder-1343/card-storage-detail.jpg", alt: "Blue style 1343 leather card holder carrying cards and folded cash for scale" },
    { src: "/assets/products/crazy-horse-leather-card-holder-1343/red-leather-detail.jpg", alt: "Red crazy horse leather slim card holder showing card slots and contrast stitching" },
  ],
  zh: [
    { src: "/assets/products/crazy-horse-leather-card-holder-1343/color-overview-logo-removed.png", alt: "款号 1343 红色、蓝色与绿色疯马皮卡包组合图，供应商品牌标识已移除" },
    { src: "/assets/products/crazy-horse-leather-card-holder-1343/card-storage-detail.jpg", alt: "1343 蓝色真皮卡包卡位及折叠钞票收纳展示" },
    { src: "/assets/products/crazy-horse-leather-card-holder-1343/red-leather-detail.jpg", alt: "1343 红色疯马皮轻薄卡包卡位与撞色车线细节" },
  ],
} as const;

const manicurePouchGallery = {
  en: [
    { src: "/assets/products/top-grain-leather-manicure-scissors-pouch-q1002/features-overview.webp", alt: "Style Q1002 embossed top-grain leather manicure scissors storage pouch feature overview; tools shown are not included" },
    { src: "/assets/products/top-grain-leather-manicure-scissors-pouch-q1002/open-closed.webp", alt: "Style Q1002 embossed top-grain leather manicure scissors pouch shown open and closed" },
    { src: "/assets/products/top-grain-leather-manicure-scissors-pouch-q1002/interior-detail.webp", alt: "Close-up of the unlined leather interior, layered tool pockets and snap closure on style Q1002" },
    { src: "/assets/products/top-grain-leather-manicure-scissors-pouch-q1002/lifestyle-open.webp", alt: "Coffee embossed leather manicure tool pouch open in a tabletop setting; tools shown are not included" },
    { src: "/assets/products/top-grain-leather-manicure-scissors-pouch-q1002/portable-travel.webp", alt: "Compact coffee leather manicure scissors storage pouch being placed into a travel bag" },
  ],
  zh: [
    { src: "/assets/products/top-grain-leather-manicure-scissors-pouch-q1002/features-overview.webp", alt: "款号 Q1002 压花头层牛皮美甲剪收纳袋功能总览，展示工具不包含在产品内" },
    { src: "/assets/products/top-grain-leather-manicure-scissors-pouch-q1002/open-closed.webp", alt: "款号 Q1002 压花头层牛皮美甲剪收纳袋打开与闭合展示" },
    { src: "/assets/products/top-grain-leather-manicure-scissors-pouch-q1002/interior-detail.webp", alt: "Q1002 无里布皮革内侧、分层工具口袋与按扣细节" },
    { src: "/assets/products/top-grain-leather-manicure-scissors-pouch-q1002/lifestyle-open.webp", alt: "咖啡色压花真皮美甲工具收纳袋场景图，展示工具不包含在产品内" },
    { src: "/assets/products/top-grain-leather-manicure-scissors-pouch-q1002/portable-travel.webp", alt: "便携咖啡色真皮美甲剪收纳袋放入旅行包的展示图" },
  ],
} as const;

const crazyHorseScissorsPouchGallery = {
  en: [
    { src: "/assets/products/crazy-horse-leather-scissors-pouch-q1003/features-overview.webp", alt: "Style Q1003 crazy horse top-grain leather scissors storage pouch feature overview; tools shown are not included" },
    { src: "/assets/products/crazy-horse-leather-scissors-pouch-q1003/open-closed.webp", alt: "Style Q1003 coffee crazy horse leather scissors pouch shown open and closed" },
    { src: "/assets/products/crazy-horse-leather-scissors-pouch-q1003/interior-detail.webp", alt: "Close-up of style Q1003 unlined leather interior, layered tool pockets and antique-tone snap closure" },
    { src: "/assets/products/crazy-horse-leather-scissors-pouch-q1003/lifestyle.webp", alt: "Coffee crazy horse leather scissors organizer standing on a tabletop; tools shown are not included" },
  ],
  zh: [
    { src: "/assets/products/crazy-horse-leather-scissors-pouch-q1003/features-overview.webp", alt: "款号 Q1003 头层牛皮疯马皮剪刀收纳袋功能总览，展示工具不包含在产品内" },
    { src: "/assets/products/crazy-horse-leather-scissors-pouch-q1003/open-closed.webp", alt: "款号 Q1003 咖啡色疯马皮剪刀收纳袋打开与闭合展示" },
    { src: "/assets/products/crazy-horse-leather-scissors-pouch-q1003/interior-detail.webp", alt: "Q1003 无里布皮革内侧、分层工具口袋与复古色按扣细节" },
    { src: "/assets/products/crazy-horse-leather-scissors-pouch-q1003/lifestyle.webp", alt: "咖啡色疯马皮剪刀收纳袋桌面场景图，展示工具不包含在产品内" },
  ],
} as const;

const multipurposePenCaseGallery = {
  en: [
    { src: "/assets/products/top-grain-leather-multipurpose-pen-case-q1004/features-overview.webp", alt: "Style Q1004 leather multipurpose pen case feature overview with color examples; pens shown are not included" },
    { src: "/assets/products/top-grain-leather-multipurpose-pen-case-q1004/black-detail.webp", alt: "Black style Q1004 leather pen and tool pouch with top zipper and leather pull" },
    { src: "/assets/products/top-grain-leather-multipurpose-pen-case-q1004/colors.webp", alt: "Style Q1004 top-grain leather multipurpose pen cases in three existing color examples" },
    { src: "/assets/products/top-grain-leather-multipurpose-pen-case-q1004/burgundy-detail.webp", alt: "Burgundy style Q1004 leather multipurpose zipper pen case detail" },
  ],
  zh: [
    { src: "/assets/products/top-grain-leather-multipurpose-pen-case-q1004/features-overview.webp", alt: "Q1004 真皮多功能笔袋功能与颜色总览，展示钢笔不包含在产品内" },
    { src: "/assets/products/top-grain-leather-multipurpose-pen-case-q1004/black-detail.webp", alt: "黑色 Q1004 真皮笔袋顶部拉链与皮质拉手细节" },
    { src: "/assets/products/top-grain-leather-multipurpose-pen-case-q1004/colors.webp", alt: "款号 Q1004 头层牛皮多功能笔袋三种现有颜色示例" },
    { src: "/assets/products/top-grain-leather-multipurpose-pen-case-q1004/burgundy-detail.webp", alt: "酒红色 Q1004 真皮多功能拉链笔袋细节" },
  ],
} as const;

const notebookCoverGallery = {
  en: [
    { src: "/assets/products/crazy-horse-leather-notebook-cover-q1005/features.webp", alt: "Style Q1005 crazy horse top-grain leather notebook cover with card pocket and pen loop; display props not included" },
    { src: "/assets/products/crazy-horse-leather-notebook-cover-q1005/open-view.webp", alt: "Style Q1005 coffee leather notebook organizer open with notebook, pen and card compartments" },
    { src: "/assets/products/crazy-horse-leather-notebook-cover-q1005/interior.webp", alt: "Style Q1005 unlined leather notebook cover interior with curved card pocket and central pen loop" },
    { src: "/assets/products/crazy-horse-leather-notebook-cover-q1005/pocket-detail.webp", alt: "Style Q1005 leather notebook cover pocket layout and stitched construction without display props" },
  ],
  zh: [
    { src: "/assets/products/crazy-horse-leather-notebook-cover-q1005/features.webp", alt: "款号 Q1005 疯马皮头层牛皮笔记本保护套、卡片口袋与笔插，展示道具不包含在产品内" },
    { src: "/assets/products/crazy-horse-leather-notebook-cover-q1005/open-view.webp", alt: "Q1005 咖啡色真皮笔记本收纳夹打开状态与笔记本、笔具、卡片收纳结构" },
    { src: "/assets/products/crazy-horse-leather-notebook-cover-q1005/interior.webp", alt: "Q1005 无里布真皮内侧、弧形卡片口袋与中部笔插" },
    { src: "/assets/products/crazy-horse-leather-notebook-cover-q1005/pocket-detail.webp", alt: "Q1005 真皮笔记本保护套口袋布局与车缝结构，无展示道具" },
  ],
} as const;

const penHolderGallery = {
  en: [
    { src: "/assets/products/top-grain-leather-pen-holder-q1006/features.webp", alt: "Style Q1006 top-grain leather cylindrical pen holder feature overview; display tools not included" },
    { src: "/assets/products/top-grain-leather-pen-holder-q1006/color-options.webp", alt: "Brown leather pen holder product views showing the cylindrical stitched construction" },
    { src: "/assets/products/top-grain-leather-pen-holder-q1006/multipurpose.webp", alt: "Top-grain leather pen holders organizing compact manicure and desk tools" },
    { src: "/assets/products/top-grain-leather-pen-holder-q1006/lifestyle.webp", alt: "Brown leather pencil cup used with colored pencils in a desk setting" },
  ],
  zh: [
    { src: "/assets/products/top-grain-leather-pen-holder-q1006/features.webp", alt: "款号 Q1006 头层牛皮圆筒笔筒功能总览，展示工具不包含在产品内" },
    { src: "/assets/products/top-grain-leather-pen-holder-q1006/color-options.webp", alt: "棕色真皮笔筒产品展示与圆筒车缝结构" },
    { src: "/assets/products/top-grain-leather-pen-holder-q1006/multipurpose.webp", alt: "头层牛皮笔筒收纳小型美甲工具与桌面工具" },
    { src: "/assets/products/top-grain-leather-pen-holder-q1006/lifestyle.webp", alt: "棕色真皮笔筒收纳彩色铅笔的桌面场景" },
  ],
} as const;

const catchallTrayGallery = {
  en: [
    { src: "/assets/products/top-grain-leather-catchall-tray-q1009/features.webp", alt: "Style Q1009 top-grain leather folding catchall tray feature overview; display accessories not included" },
    { src: "/assets/products/top-grain-leather-catchall-tray-q1009/folding.webp", alt: "Style Q1009 fold-flat leather valet tray corner snap assembly" },
    { src: "/assets/products/top-grain-leather-catchall-tray-q1009/closeup.webp", alt: "Coffee leather catchall tray with unlined suede-side interior and antique-tone snaps" },
    { src: "/assets/products/top-grain-leather-catchall-tray-q1009/lifestyle.webp", alt: "Coffee leather valet tray used for keys and cables on a side table" },
  ],
  zh: [
    { src: "/assets/products/top-grain-leather-catchall-tray-q1009/features.webp", alt: "款号 Q1009 头层牛皮折叠收纳托盘功能总览，展示配件不包含在产品内" },
    { src: "/assets/products/top-grain-leather-catchall-tray-q1009/folding.webp", alt: "Q1009 可平铺真皮收纳盘四角按扣组合方式" },
    { src: "/assets/products/top-grain-leather-catchall-tray-q1009/closeup.webp", alt: "咖啡色真皮收纳托盘无里布绒面内侧与复古色按扣细节" },
    { src: "/assets/products/top-grain-leather-catchall-tray-q1009/lifestyle.webp", alt: "咖啡色真皮桌面收纳盘放置钥匙与线材的生活场景" },
  ],
} as const;

const compassPencilCaseGallery = {
  en: [
    { src: "/assets/products/top-grain-leather-compass-pencil-case-q1008/features.webp", alt: "Style Q1008 top-grain cowhide compass pencil case feature overview; pens and display props not included" },
    { src: "/assets/products/top-grain-leather-compass-pencil-case-q1008/interior.webp", alt: "Style Q1008 compass pencil case open with polyester lining, elastic pen loops and mesh pocket" },
    { src: "/assets/products/top-grain-leather-compass-pencil-case-q1008/closed.webp", alt: "Coffee top-grain leather compass pencil case closed with zip-around construction" },
    { src: "/assets/products/top-grain-leather-compass-pencil-case-q1008/lifestyle.webp", alt: "Coffee leather compass pencil pouch held in a desktop setting" },
  ],
  zh: [
    { src: "/assets/products/top-grain-leather-compass-pencil-case-q1008/features.webp", alt: "款号 Q1008 头层牛皮罗盘拉链笔袋功能总览，钢笔及展示道具不包含在产品内" },
    { src: "/assets/products/top-grain-leather-compass-pencil-case-q1008/interior.webp", alt: "Q1008 罗盘笔袋打开状态与涤纶里布、弹力笔插及网袋结构" },
    { src: "/assets/products/top-grain-leather-compass-pencil-case-q1008/closed.webp", alt: "咖啡色头层牛皮罗盘笔袋闭合状态与环绕拉链结构" },
    { src: "/assets/products/top-grain-leather-compass-pencil-case-q1008/lifestyle.webp", alt: "咖啡色真皮罗盘笔袋手持桌面场景" },
  ],
} as const;

const embossedPenSleeveGallery = {
  en: [
    { src: "/assets/products/embossed-top-grain-leather-pen-sleeve-q1010/features.webp", alt: "Style Q1010 floral-embossed top-grain leather pen sleeve feature overview; pens not included" },
    { src: "/assets/products/embossed-top-grain-leather-pen-sleeve-q1010/open-closed.webp", alt: "Two listed sizes of style Q1010 embossed leather pen sleeve shown open and closed" },
    { src: "/assets/products/embossed-top-grain-leather-pen-sleeve-q1010/detail.webp", alt: "Close-up of brown floral-embossed leather pen sleeve and tuck-through flap closure" },
    { src: "/assets/products/embossed-top-grain-leather-pen-sleeve-q1010/lifestyle.webp", alt: "Brown embossed top-grain leather pen sleeve held in a stationery setting" },
  ],
  zh: [
    { src: "/assets/products/embossed-top-grain-leather-pen-sleeve-q1010/features.webp", alt: "款号 Q1010 花卉压花头层牛皮笔套功能总览，钢笔不包含在产品内" },
    { src: "/assets/products/embossed-top-grain-leather-pen-sleeve-q1010/open-closed.webp", alt: "Q1010 压花真皮笔套两种所列尺寸的打开与闭合状态" },
    { src: "/assets/products/embossed-top-grain-leather-pen-sleeve-q1010/detail.webp", alt: "棕色花卉压花真皮笔套与插入式翻盖闭合细节" },
    { src: "/assets/products/embossed-top-grain-leather-pen-sleeve-q1010/lifestyle.webp", alt: "棕色压花头层牛皮笔套手持文具场景" },
  ],
} as const;

const colors = [
  ["Black / 黑色", "#22201e"],
  ["Brown / 棕色", "#6c3f27"],
  ["Red Brown / 红棕", "#7b3526"],
  ["Coffee / 咖啡", "#49342b"],
  ["Oil Coffee / 油咖啡", "#795238"],
] as const;

const airTagColors = [
  ["Brown / 棕色", "#704126"],
  ["Dark Green / 深绿", "#233e31"],
  ["Navy Blue / 藏青", "#173b49"],
  ["Burgundy / 酒红", "#702b32"],
  ["Black / 黑色", "#1d1d1c"],
] as const;

const compassColors = [
  ["Crazy Horse Coffee · Compass / 疯马咖·罗盘", "#4b3024"],
  ["Brown · Compass / 棕色·罗盘", "#74442d"],
  ["Oil Coffee · Compass / 油咖·罗盘", "#60442f"],
  ["Oil Red Brown · Compass / 油红棕·罗盘", "#743a2d"],
  ["Black · Compass / 黑色·罗盘", "#252321"],
  ["Crazy Horse Coffee · Plain / 疯马咖啡·素面", "#533528", "/assets/products/leather-compass-wallet-1040/pattern-compass.webp"],
  ["Crazy Horse Coffee · Sailor / 疯马咖·水手", "#5a3828", "/assets/products/leather-compass-wallet-1040/pattern-sailor.webp"],
  ["Crazy Horse Coffee · Anchor / 疯马咖·船锚", "#503126", "/assets/products/leather-compass-wallet-1040/pattern-anchor.webp"],
  ["Crazy Horse Coffee · Tower / 疯马咖·铁塔", "#62402e", "/assets/products/leather-compass-wallet-1040/pattern-eiffel-tower.webp"],
] as const;

const zipCoinWalletColors = [
  ["Black / 黑色", "#1d1d1b"],
  ["Coffee / 咖啡", "#513226"],
  ["Brown / 棕色", "#74452d"],
  ["Red Coffee / 红咖", "#6c352b"],
] as const;

const cardHolderColors = [
  ["Crazy Horse Coffee / 疯马咖", "#5a3828"],
  ["Brown / 棕色", "#74442d"],
  ["Red / 红色", "#7a2526"],
  ["Green / 绿色", "#243f34"],
  ["Blue / 蓝色", "#223c4b"],
  ["Black / 黑色", "#20201f"],
] as const;

const manicurePouchColors = [
  ["Coffee / 咖啡色", "#754a2d"],
] as const;

const crazyHorseScissorsPouchColors = [
  ["Coffee / 咖啡色", "#4f3025"],
] as const;

const multipurposePenCaseColors = [
  ["Black / 黑色", "#20201f"],
  ["Coffee / 咖啡色", "#8a562f"],
  ["Burgundy / 酒红色", "#7a2830"],
  ["Dark Coffee / 深咖啡色", "#4b3228"],
  ["Blue / 蓝色", "#27445a"],
] as const;

const notebookCoverColors = [
  ["Coffee / 咖啡色", "#4b3025"],
  ["Brown / 棕色", "#75462d"],
] as const;

const penHolderColors = [
  ["Brown / 棕色", "#9a673f"],
] as const;

const catchallTrayColors = [
  ["Coffee / 咖啡色", "#4c3026"],
] as const;

const compassPencilCaseColors = [
  ["Coffee / 咖啡色", "#4a3028"],
] as const;

const embossedPenSleeveColors = [
  ["Brown / 棕色", "#8a5737"],
] as const;

const customization = {
  en: [
    { icon: Tag, title: "Logo", text: "Evaluate the logo treatment against your artwork." },
    { icon: Swatches, title: "Color", text: "Match listed colors or review custom development." },
    { icon: CheckCircle, title: "Hardware", text: "Confirm zippers and metal details during sampling." },
    { icon: PencilSimple, title: "Interior", text: "Adjust card, cash and coin storage to your brief." },
    { icon: Package, title: "Packaging", text: "Develop retail or export packaging for your market." },
  ],
  zh: [
    { icon: Tag, title: "品牌标识", text: "结合品牌图稿评估适用的标识工艺。" },
    { icon: Swatches, title: "颜色", text: "选用现有颜色或评估定制颜色开发。" },
    { icon: CheckCircle, title: "五金", text: "在打样阶段确认拉链与金属细节。" },
    { icon: PencilSimple, title: "内部结构", text: "按需求调整卡位、现金位与零钱位。" },
    { icon: Package, title: "包装", text: "根据销售市场开发零售或出口包装。" },
  ],
} as const;

const cardHolderCustomization = {
  en: [
    { icon: Tag, title: "Logo", text: "Evaluate the logo treatment against your artwork." },
    { icon: Swatches, title: "Color", text: "Match a listed color or review custom development." },
    { icon: PencilSimple, title: "Card Layout", text: "Evaluate card-slot and central-pocket changes." },
    { icon: CheckCircle, title: "Stitching", text: "Confirm thread color and edge details during sampling." },
    { icon: Package, title: "Packaging", text: "Review retail or export packaging for your market." },
  ],
  zh: [
    { icon: Tag, title: "品牌标识", text: "结合品牌图稿评估适用的标识工艺。" },
    { icon: Swatches, title: "颜色", text: "选用链接所列颜色或评估定制开发。" },
    { icon: PencilSimple, title: "卡位结构", text: "按需求评估卡位与中央收纳位调整。" },
    { icon: CheckCircle, title: "车缝细节", text: "在打样阶段确认线色与边缘处理。" },
    { icon: Package, title: "包装", text: "根据销售市场评估零售或出口包装。" },
  ],
} as const;

const manicurePouchCustomization = {
  en: [
    { icon: Tag, title: "Logo", text: "Evaluate the logo treatment against your artwork." },
    { icon: Swatches, title: "Color", text: "Use coffee or review custom color development." },
    { icon: CheckCircle, title: "Hardware", text: "Confirm snap finish and metal color during sampling." },
    { icon: PencilSimple, title: "Lining & Layout", text: "Evaluate lining and pocket changes for your tool set." },
    { icon: Package, title: "Packaging", text: "Review retail or export packaging for your market." },
  ],
  zh: [
    { icon: Tag, title: "品牌标识", text: "结合品牌图稿评估适用的标识工艺。" },
    { icon: Swatches, title: "颜色", text: "选用咖啡色或评估定制颜色开发。" },
    { icon: CheckCircle, title: "五金", text: "在打样阶段确认按扣表面效果与金属颜色。" },
    { icon: PencilSimple, title: "里布与结构", text: "结合工具组合评估里布与口袋结构调整。" },
    { icon: Package, title: "包装", text: "根据销售市场评估零售或出口包装。" },
  ],
} as const;

const multipurposePenCaseCustomization = {
  en: [
    { icon: Tag, title: "Logo", text: "Evaluate the logo treatment against your artwork." },
    { icon: Swatches, title: "Color", text: "Match a listed color or review custom development." },
    { icon: CheckCircle, title: "Hardware", text: "Confirm zipper and rivet finishes during sampling." },
    { icon: PencilSimple, title: "Lining & Structure", text: "Evaluate lining and construction changes for your contents." },
    { icon: Package, title: "Packaging", text: "Review retail or export packaging for your market." },
  ],
  zh: [
    { icon: Tag, title: "品牌标识", text: "结合品牌图稿评估适用的标识工艺。" },
    { icon: Swatches, title: "颜色", text: "选用所列颜色或评估定制颜色开发。" },
    { icon: CheckCircle, title: "五金", text: "在打样阶段确认拉链与铆钉表面效果。" },
    { icon: PencilSimple, title: "里布与结构", text: "结合拟装物品评估里布与结构调整。" },
    { icon: Package, title: "包装", text: "根据销售市场评估零售或出口包装。" },
  ],
} as const;

const accessoryCustomization = {
  en: [
    { icon: Tag, title: "Logo", text: "Evaluate the logo treatment against your artwork." },
    { icon: Swatches, title: "Color", text: "Match an existing color or review custom development." },
    { icon: CheckCircle, title: "Hardware", text: "Confirm applicable metal details during sampling." },
    { icon: PencilSimple, title: "Construction", text: "Evaluate dimensions and structural changes for your use case." },
    { icon: Package, title: "Packaging", text: "Review retail or export packaging for your market." },
  ],
  zh: [
    { icon: Tag, title: "品牌标识", text: "结合品牌图稿评估适用的标识工艺。" },
    { icon: Swatches, title: "颜色", text: "选用现有颜色或评估定制颜色开发。" },
    { icon: CheckCircle, title: "五金", text: "在打样阶段确认适用的金属细节。" },
    { icon: PencilSimple, title: "结构", text: "结合使用需求评估尺寸与结构调整。" },
    { icon: Package, title: "包装", text: "根据销售市场评估零售或出口包装。" },
  ],
} as const;

const penCaseCustomization = {
  en: [
    { icon: Tag, title: "Logo", text: "Evaluate the logo treatment against your artwork." },
    { icon: Swatches, title: "Color", text: "Match the existing color or review custom development." },
    { icon: CheckCircle, title: "Hardware", text: "Confirm applicable zipper or metal details during sampling." },
    { icon: PencilSimple, title: "Lining & Structure", text: "Evaluate lining, dimensions and organizer details for your use case." },
    { icon: Package, title: "Packaging", text: "Review retail or export packaging for your market." },
  ],
  zh: [
    { icon: Tag, title: "品牌标识", text: "结合品牌图稿评估适用的标识工艺。" },
    { icon: Swatches, title: "颜色", text: "选用现有颜色或评估定制颜色开发。" },
    { icon: CheckCircle, title: "五金", text: "在打样阶段确认适用的拉链或金属细节。" },
    { icon: PencilSimple, title: "里布与结构", text: "结合使用需求评估里布、尺寸与内部收纳细节。" },
    { icon: Package, title: "包装", text: "根据销售市场评估零售或出口包装。" },
  ],
} as const;

const packaging = {
  en: [["Surface Protection", "Protect the leather"], ["Inner Packaging", "As requested"], ["Export Carton", "Order-ready packing"], ["Final Inspection", "Before shipment"]],
  zh: [["表面防护", "保护皮面"], ["内包装", "按需求配置"], ["出口外箱", "按订单装箱"], ["成品检验", "发货前检查"]],
} as const;

const process = {
  en: [[ChatCircleDots, "Inquiry", "Share your requirements"], [ClipboardText, "Confirm", "Details, cost & quantity"], [PencilSimple, "Sample", "Sample development"], [Factory, "Production", "Mass production"], [GlobeHemisphereWest, "Delivery", "Inspection & shipment"]],
  zh: [[ChatCircleDots, "需求沟通", "提供产品要求"], [ClipboardText, "方案确认", "确认细节、报价与数量"], [PencilSimple, "样品开发", "制作确认样品"], [Factory, "批量生产", "按确认样品量产"], [GlobeHemisphereWest, "包装交付", "检验、包装与发运"]],
} as const;

export default function Wallet8064Experience({ locale, product = "8064" }: { locale: Locale; product?: "8064" | "airtag-passport-wallet" | "compass-bifold-wallet" | "zip-coin-wallet" | "crazy-horse-card-holder" | "manicure-scissors-pouch" | "crazy-horse-scissors-pouch" | "multipurpose-pen-case" | "notebook-cover" | "pen-holder" | "catchall-tray" | "compass-pencil-case" | "embossed-pen-sleeve" }) {
  const isAirTagWallet = product === "airtag-passport-wallet";
  const isCompassWallet = product === "compass-bifold-wallet";
  const isZipCoinWallet = product === "zip-coin-wallet";
  const isCardHolder = product === "crazy-horse-card-holder";
  const isManicurePouch = product === "manicure-scissors-pouch";
  const isCrazyHorseScissorsPouch = product === "crazy-horse-scissors-pouch";
  const isMultipurposePenCase = product === "multipurpose-pen-case";
  const isNotebookCover = product === "notebook-cover";
  const isPenHolder = product === "pen-holder";
  const isCatchallTray = product === "catchall-tray";
  const isCompassPencilCase = product === "compass-pencil-case";
  const isEmbossedPenSleeve = product === "embossed-pen-sleeve";
  const copy = isCompassPencilCase ? compassPencilCaseContent[locale] : isEmbossedPenSleeve ? embossedPenSleeveContent[locale] : isNotebookCover ? notebookCoverContent[locale] : isPenHolder ? penHolderContent[locale] : isCatchallTray ? catchallTrayContent[locale] : isCrazyHorseScissorsPouch ? crazyHorseScissorsPouchContent[locale] : isMultipurposePenCase ? multipurposePenCaseContent[locale] : isManicurePouch ? manicurePouchContent[locale] : isCardHolder ? cardHolderContent[locale] : isZipCoinWallet ? zipCoinWalletContent[locale] : isCompassWallet ? compassContent[locale] : isAirTagWallet ? airTagContent[locale] : content[locale];
  const images = isCompassPencilCase ? compassPencilCaseGallery[locale] : isEmbossedPenSleeve ? embossedPenSleeveGallery[locale] : isNotebookCover ? notebookCoverGallery[locale] : isPenHolder ? penHolderGallery[locale] : isCatchallTray ? catchallTrayGallery[locale] : isCrazyHorseScissorsPouch ? crazyHorseScissorsPouchGallery[locale] : isMultipurposePenCase ? multipurposePenCaseGallery[locale] : isManicurePouch ? manicurePouchGallery[locale] : isCardHolder ? cardHolderGallery[locale] : isZipCoinWallet ? zipCoinWalletGallery[locale] : isCompassWallet ? compassGallery[locale] : isAirTagWallet ? airTagGallery[locale] : gallery[locale];
  const displayedColors: readonly WalletOption[] = isCompassPencilCase ? compassPencilCaseColors : isEmbossedPenSleeve ? embossedPenSleeveColors : isNotebookCover ? notebookCoverColors : isPenHolder ? penHolderColors : isCatchallTray ? catchallTrayColors : isCrazyHorseScissorsPouch ? crazyHorseScissorsPouchColors : isMultipurposePenCase ? multipurposePenCaseColors : isManicurePouch ? manicurePouchColors : isCardHolder ? cardHolderColors : isZipCoinWallet ? zipCoinWalletColors : isCompassWallet ? compassColors : isAirTagWallet ? airTagColors : colors;
  const materialImage = isCompassPencilCase ? compassPencilCaseGallery[locale][1].src : isEmbossedPenSleeve ? embossedPenSleeveGallery[locale][2].src : isNotebookCover ? notebookCoverGallery[locale][2].src : isPenHolder ? penHolderGallery[locale][1].src : isCatchallTray ? catchallTrayGallery[locale][2].src : isCrazyHorseScissorsPouch ? crazyHorseScissorsPouchGallery[locale][2].src : isMultipurposePenCase ? multipurposePenCaseGallery[locale][1].src : isManicurePouch ? manicurePouchGallery[locale][2].src : isCardHolder ? cardHolderGallery[locale][1].src : isZipCoinWallet ? zipCoinWalletGallery[locale][1].src : isCompassWallet ? compassGallery[locale][1].src : isAirTagWallet ? airTagGallery[locale][1].src : `${imageBase}/front.jpg`;
  const customizationMethods = isCompassPencilCase || isEmbossedPenSleeve ? penCaseCustomization[locale] : isNotebookCover || isPenHolder || isCatchallTray ? accessoryCustomization[locale] : isCrazyHorseScissorsPouch ? manicurePouchCustomization[locale] : isMultipurposePenCase ? multipurposePenCaseCustomization[locale] : isManicurePouch ? manicurePouchCustomization[locale] : isCardHolder ? cardHolderCustomization[locale] : customization[locale];
  const catalogueImage = isCompassPencilCase ? compassPencilCaseGallery[locale][3].src : isEmbossedPenSleeve ? embossedPenSleeveGallery[locale][3].src : isNotebookCover ? notebookCoverGallery[locale][3].src : isPenHolder ? penHolderGallery[locale][3].src : isCatchallTray ? catchallTrayGallery[locale][3].src : isCrazyHorseScissorsPouch ? crazyHorseScissorsPouchGallery[locale][3].src : isMultipurposePenCase ? multipurposePenCaseGallery[locale][3].src : isManicurePouch ? manicurePouchGallery[locale][0].src : isCardHolder ? cardHolderGallery[locale][0].src : isZipCoinWallet ? zipCoinWalletGallery[locale][0].src : isCompassWallet ? compassGallery[locale][3].src : isAirTagWallet ? airTagGallery[locale][3].src : `${imageBase}/scenario.jpg`;
  const referenceLabel = isCompassPencilCase ? (locale === "zh" ? "款号 Q1008" : "Style No. Q1008") : isEmbossedPenSleeve ? (locale === "zh" ? "款号 Q1010" : "Style No. Q1010") : isNotebookCover ? (locale === "zh" ? "款号 Q1005" : "Style No. Q1005") : isPenHolder ? (locale === "zh" ? "款号 Q1006" : "Style No. Q1006") : isCatchallTray ? (locale === "zh" ? "款号 Q1009" : "Style No. Q1009") : isCrazyHorseScissorsPouch ? (locale === "zh" ? "款号 Q1003" : "Style No. Q1003") : isMultipurposePenCase ? (locale === "zh" ? "款号 Q1004" : "Style No. Q1004") : isManicurePouch ? (locale === "zh" ? "款号 Q1002" : "Style No. Q1002") : isCardHolder ? (locale === "zh" ? "款号 1343" : "Style No. 1343") : isZipCoinWallet ? (locale === "zh" ? "款号 7042" : "Style No. 7042") : isCompassWallet ? (locale === "zh" ? "款号 1040" : "Style No. 1040") : isAirTagWallet ? (locale === "zh" ? "款号 1400" : "Style No. 1400") : "SKU 8064";
  const [activeImage, setActiveImage] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [status, setStatus] = useState<FormStatus>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const startedAt = useRef(Date.now());
  const prefix = locale === "zh" ? "/zh" : "";
  const categoryHref = isNotebookCover
    ? `${prefix}/products?category=small-leather-goods#products-index`
    : isCompassPencilCase || isEmbossedPenSleeve || isPenHolder || isCatchallTray || isCrazyHorseScissorsPouch || isMultipurposePenCase
      ? `${prefix}/products?category=desk-lifestyle#products-index`
      : `${prefix}/products`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await submitInquiry({
        name: String(values.get("name") ?? ""),
        email: String(values.get("email") ?? ""),
        phone: String(values.get("phone") ?? ""),
        country: String(values.get("country") ?? ""),
        product: `${String(values.get("product") ?? "")} | Quantity: ${String(values.get("quantity") ?? "Not provided")}`,
        message: String(values.get("message") ?? ""),
        website: String(values.get("website") ?? ""),
        startedAt: startedAt.current,
      });

      if (!response.ok) throw new Error("Inquiry request failed");
      form.reset();
      setStatus({ tone: "success", message: copy.form.success });
    } catch {
      setStatus({ tone: "error", message: copy.form.error });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="product-page" id="top">
      <div className="product-shell">
        <div className="breadcrumbs"><Link href={prefix || "/"}>{copy.home}</Link><span>›</span><Link href={`${prefix}/products`}>{copy.products}</Link><span>›</span><Link href={categoryHref}>{copy.category}</Link><span>›</span><b>{copy.name}</b></div>

        <section className="product-hero-detail">
          <aside className="gallery-thumbnails" aria-label={copy.galleryLabel}>
            {images.map((image, index) => <button className={activeImage === index ? "is-selected" : ""} type="button" key={image.src} onClick={() => setActiveImage(index)} aria-label={`${copy.showImage} ${index + 1}`}><Image src={image.src} alt="" width={100} height={100} /></button>)}
          </aside>
          <div className="gallery-stage"><Image src={images[activeImage].src} alt={images[activeImage].alt} width={1000} height={1000} priority sizes="(max-width: 760px) 100vw, 55vw" /></div>
          <div className="product-intro">
            <p className="product-kicker">{copy.kicker} <span /></p>
            <h1>{copy.title}</h1>
            <p>{copy.intro}</p>
            <span className="product-intro-rule" />
            <a className="product-primary-button" href="#inquiry">{copy.request} <ArrowRight size={17} /></a>
            <a className="product-whatsapp" href={whatsapp} target="_blank" rel="noreferrer"><WhatsappLogo size={18} /> {copy.chat}</a>
          </div>
        </section>

        <section className="quick-facts" aria-label={copy.factsLabel}>
          {copy.facts.map(([label, value]) => <div key={label}><strong>{label}</strong><span>{value}</span></div>)}
        </section>

        <section className="detail-section specifications" id="specifications">
          <div className="section-title"><p>{copy.specifications}</p><span /></div>
          <div className="spec-table">
            {copy.specs.map(({ left, right }) => <div className="spec-pair" key={right[0]}><div className="spec-row"><strong>{left[0]}</strong><span>{left[1]}</span></div><div className="spec-row"><strong>{right[0]}</strong><span>{right[1]}</span></div></div>)}
          </div>
          <small className="spec-note">{copy.specNote}</small>
        </section>

        <section className="detail-section option-grid" id="customization">
          <article className="material-card"><div className="section-title"><p>{copy.materialTitle}</p></div><Image src={materialImage} alt={images[1].alt} width={1000} height={1000} /><h2>{copy.materialName}</h2><p>{copy.materialCopy}</p></article>
          <article className="color-card"><div className="section-title"><p>{copy.colorsTitle}</p></div><div className="color-swatches wallet-color-swatches">{displayedColors.map(([name, color, image]) => <button type="button" key={name} aria-label={name}><span className={image ? "wallet-pattern-preview" : undefined} style={{ backgroundColor: color, backgroundImage: image ? `url(${image})` : undefined }} /><small>{name}</small></button>)}</div><p>{copy.colorsCopy}</p></article>
          <article className="custom-card"><div className="section-title"><p>{copy.customizationTitle}</p></div><div className="custom-methods">{customizationMethods.map(({ icon: Icon, title, text }) => <div key={title}><Icon size={28} weight="thin" /><strong>{title}</strong><small>{text}</small></div>)}</div></article>
        </section>

        <section className="detail-section delivery-grid" id="process">
          <article><div className="section-title"><p>{copy.packagingTitle}</p></div><div className="packaging-list">{packaging[locale].map(([title, text], index) => <div key={title}><Package size={40} weight="thin" /><strong>{title}</strong><small>{text}</small>{index < packaging[locale].length - 1 ? <ArrowRight className="packaging-arrow" size={16} weight="thin" /> : null}</div>)}</div></article>
          <article><div className="section-title"><p>{copy.processTitle}</p></div><div className="order-process">{process[locale].map(([Icon, title, text], index) => <div key={title as string} className="order-step"><span><Icon size={28} weight="thin" /></span><strong>{title as string}</strong><small>{text as string}</small>{index < process[locale].length - 1 ? <ArrowRight className="order-arrow" size={16} weight="thin" /> : null}</div>)}</div></article>
        </section>

        <section className="detail-section factory-visit" aria-label={copy.factoryTitle}>
          <Image src="/assets/product-detail/factory-client-visit-v1.png" alt={copy.factoryTitle} width={1200} height={800} />
          <div className="factory-visit-content"><p className="factory-visit-kicker">{copy.factoryKicker}</p><h2>{copy.factoryTitle}</h2><p>{copy.factoryCopy}</p><div className="factory-visit-points">{copy.factoryPoints.map((point) => <span key={point}><CheckCircle size={17} weight="fill" /> {point}</span>)}</div><Link className="product-primary-button" href={`${prefix}/about#visit`}>{copy.factoryCta} <ArrowRight size={17} /></Link></div>
        </section>

        <section className="detail-section faq-catalogue" id="faq">
          <article className="faq-list"><div className="section-title"><p>{copy.faqTitle}</p></div>{copy.faqs.map(([question, answer], index) => <div className="faq-item" key={question}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>{question}<span>{openFaq === index ? "−" : "+"}</span></button>{openFaq === index ? <p>{answer}</p> : null}</div>)}</article>
          <article className="catalogue-card"><div><div className="section-title"><p>{referenceLabel}</p></div><p>{copy.intro}</p><a className="product-primary-button" href="#inquiry">{copy.request}</a></div><Image src={catalogueImage} alt={images[0].alt} width={1000} height={1000} /></article>
        </section>

        <section className="detail-section inquiry-section" id="inquiry">
          <form className="product-inquiry-form" onSubmit={handleSubmit}>
            <div className="section-title"><p>{copy.inquiryTitle}</p></div><p>{copy.inquiryCopy}</p>
            <div className="product-form-grid"><input required aria-label={copy.form.name} placeholder={copy.form.name} name="name" autoComplete="name" /><input aria-label={copy.form.company} placeholder={copy.form.company} name="company" autoComplete="organization" /><input required type="email" aria-label={copy.form.email} placeholder={copy.form.email} name="email" autoComplete="email" /><input required type="tel" aria-label={copy.form.phone} placeholder={copy.form.phone} name="phone" autoComplete="tel" /><input aria-label={copy.form.country} placeholder={copy.form.country} name="country" autoComplete="country-name" /><input readOnly aria-label={copy.form.product} name="product" value={`${referenceLabel} · ${copy.name}`} /><input aria-label={copy.form.quantity} placeholder={copy.form.quantity} name="quantity" /></div>
            <textarea required aria-label={copy.form.message} placeholder={copy.form.message} name="message" rows={5} />
            <div hidden><label>Website<input autoComplete="off" name="website" tabIndex={-1} /></label></div>
            <label className="privacy-check"><input required type="checkbox" /> {copy.form.privacy}</label>
            <button className="product-primary-button product-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? copy.form.sending : copy.form.submit} <ArrowRight size={17} /></button>
            {status ? <p className="product-success" role={status.tone === "error" ? "alert" : "status"}>{status.message}</p> : null}
          </form>
          <aside className="partner-card"><div><div className="section-title"><p>{copy.partnerTitle}</p></div><ul>{copy.partnerPoints.map((point, index) => { const Icon = [ShieldCheck, Swatches, CheckCircle, ChatCircleDots][index]; return <li key={point}><Icon size={18} /> {point}</li>; })}</ul></div><div className="partner-contact"><strong>{copy.contactTitle}</strong><a href={contactEmailHref}>{contactEmail}</a><a href={whatsapp} target="_blank" rel="noreferrer">+86 189 2507 3489</a><span>{locale === "zh" ? "中国 · 广州" : "Guangzhou, China"}</span></div></aside>
        </section>
      </div>

      <InternalLinkPanel title={copy.linksTitle} description={copy.linksCopy} links={[...copy.links]} />
    </main>
  );
}
