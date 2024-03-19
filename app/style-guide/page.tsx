"use client"
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import { useRouter } from 'next/navigation'
import { BounceLoader, BeatLoader } from 'react-spinners';
import { saveAs } from 'file-saver';

import axios from 'axios';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


interface Errors {
    companyName?: boolean;
    coreValues?: boolean;
    sampleText1?: boolean;
    sampleText2?: boolean;
    sampleText3?: boolean;
}

const hardCodeStyle = `apple-inc.stg
Introduction:
What are brand voice & tone guidelines: Brand voice and tone guidelines are critical tools that help ensure consistent communication across all platforms and touchpoints. They guide the language, style, tone, and voice used in all our interactions and drive efficiency, alignment and concise messaging. Simply put, they help us sound like us, everywhere, every time.
Purpose: These guidelines help to align communication across all platforms, ensure clarity and consistency in our messaging, and foster a strong connection with our target audience.
How they help: Guidelines ensure that our brand is conveyed authentically and consistently while resonating and engaging with our customers effectively.
Why we're using them: We use these guidelines to ensure that every message we put out into the world reflects our brand's personality, enhances our customer relationships, and supports our company ethos and vision.
Voice & Tone Guiding Principles:
Principle: Authentic&Innovative
What it means: With a rich history under our belts, our voice should always sound true to who we are, and our tone should express our culture of forward-thinking and innovation.
How it affects our writing: Our writing should be an honest reflection of our brand and embody our spirit of being pioneers in technology, consistently pushing boundaries.
Example best practice copy: We're Apple. We're not just a technology company. We're your partners in innovation, dedicated to enriching your lives and empowering your future, every day.
What not to do in the copy: Avoid jargon, overcomplexity, or overdramatizing our achievements.
Examples of incorrect copy: Introducing the supreme songbird of technology, ushering in a digital utopia!
Principle: Inspiring&Supportive
What it means: We aim to not only create technology but inspire our customers with our commitment to a better, sustainable future, all while supporting and enriching their lives
How it affects our writing: Our narrative should aim to motivate and guide while remaining supportive and understanding towards our consumers' needs.
Example best practice copy: At Apple, we're here to make technology a seamless, enriching part of your life, and committed to creating a sustainable future for us all.
What not to do in the copy: Avoid sounding condescending or unsupportive to customer needs and desires.
Examples of incorrect copy: Why wouldn't anyone want our newest product? It is obviously the best!
Vocabulary: Our language must be clear, coherent, and compelling. We communicate simply, avoid jargon, and use powerful, straightforward language that people can connect with. Every word should resonate with our purpose of enriching lives through innovation and sustainability.
Tone: Our tone is confident, inspiring, and supportive. We speak in an assured and aspirational manner, yet with a deep sense of empathy and understanding for our audience. Our voice soothes, educates, and invigorates, reflecting our innovations and our undying commitment to our customers.
Cadence: Our rhythm is smooth, deliberate, and dynamic. We structure our sentences to flow naturally and harness the power of rhythm to captivate our audience. Our writing style is crisp, concise and fluid, reflecting Apple's simplistic yet powerful persona.
Marketing channels:
Website and Blogs: Maintain an inspiring and supportive tone with a clear and vivid language
Social Media: Lean towards a more conversational and engaging tone. Include calls to action when appropriate.
Email Marketing: Focus on direct language that is both informative and supportive
Offline Channels: Retain a confident and inspiring tone. Use clear and concise descriptions.
`

import jsonData from '@/public/elite-law-firm.json'

export default function Page() {
    const [errors, setErrors] = useState<Errors>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [style, setStyle] = useState<string|undefined>(hardCodeStyle);
    const [cost, setCost] = useState();
    const router = useRouter()
    const text1 = `Built for the future
    Feel the benefit of experience without the burden of legacy. Together we can embrace change and seize opportunities.
    
    MAKING BUSINESS BETTER
    We believe great businesses can make a better world. Forward-thinking, innovative organizations can find the answers to today’s most difficult questions. That’s why, every day, we help them succeed. 
    Our bold and dynamic culture means we think big and act decisively. Because relationships are at the heart of everything we do for our clients and communities.
    Let’s make business better. Together.
    
    OUR VALUES
    We are committed to excellence in how we represent our clients, develop our people, and serve our communities.
    Bold
    We are fearless and inquisitive, challenging ourselves to think big and find creative new solutions
    Exceptional
    We are strategic and driven, exceeding standards and expectations
    Supportive
    We are compassionate and inclusive, valuing diversity and acting thoughtfully
    Collaborative
    We are proactive, passionate team players, investing in our relationships
    
    PROTECTING TOMORROW FOR EVERYONE
    In today’s world, ESG issues are of critical importance to business. We’re helping our clients transition to, and thrive in, a more sustainable future. We ask tough questions about purpose and transparency, and find the answers together.
    
    We’re also looking for opportunities to integrate sustainability into our governance, decision-making and operations. We ensure our people have the right resources and support they need to perform and deliver at their best for our clients.
    
    How we’re transforming our business
    Our sustainability strategy is informed by our recent double materiality assessment. It’s focused on taking action in the areas most important to our business and that have the most influence on society and the environment. We’ve put them into five interrelated categories: our people, our clients, our society, our environment, and sound governance.
    
    Reaching net zero by 2040
    The climate crisis is already having a severe impact around the world. We must take decisive action now. Professional services is not a carbon intensive sector. We know the vast majority of our carbon footprint – 95% – is in our supply chain, including procurement and business travel. But we must do our part to decarbonise our business and value chain, and help our clients do the same. The net zero transition is our number one material issue.
    Collaboration plays a crucial role in climate action. We're a founding member of the Legal Sustainability Alliance and the Net Zero Lawyers Alliance. JP Douglas-Henry, our Managing Director for Sustainability and Resilience, sits on NZLA's steering committee. NZLA is committed to climate action, promoting sustainability reporting and sharing best practice in the legal sector.
    In 2023 we founded the Legal Charter 1.5 alongside seven other law firms with offices in the UK. This group seeks to galvanise the legal sector’s role in achieving the Paris goals.
    We’re a founding member of the Legal Taskforce for the Sustainable Markets Initiative (SMI), a leading project to build a coordinated global effort to enable the private sector to accelerate the transition to a sustainable future.
    We're also a founding member of Global Alliance of Impact Lawyers, a community of legal leaders using the practice of law to have a positive impact on people and the planet, and to accelerate the just transition.
    We have a near-term target to halve our carbon footprint in all three scopes by 2030 against a 2019 baseline. We also have a net zero target to reduce all three scopes by 90% by 2040 from a 2019 baseline, and to neutralise the remaining residual emissions at the net zero target year, 2040, through carbon removal. Both of these targets follow the methodology of the Science-Based Targets initiative.
    
    Decarbonising our business
    To decarbonise our business, we’re focused on transforming it in five areas:
    •	implementing our Thoughtful Travel campaign to reduce emissions by 75% by 2030
    •	working with suppliers to reduce emissions on our supply chain by 25% by 2030
    •	switching to renewable electricity across Europe by 2025, and all offices by 2030
    •	optimising energy use in our offices
    •	designing future workspaces with sustainability and health in mind
    Our biggest potential contribution to global decarbonisation efforts is by helping clients on their own net zero journeys. We’re ensuring our approach to client work is aligned with our climate ambition, including how we map and measure advised emissions as we develop our climate transition plan. 
    Our environmental actions are aligned with locally and internationally recognised standards and initiatives, including:
    •	certification to ISO 14001, ISO 50001 and the Carbon Trust’s Route to Net Zero standard
    •	the UN Global Compact
    •	The Legal Renewables Initiative in the UK
    •	Business Ambition for 1.5°C.
    
    PURSUING JUSTICE AND SOCIAL CHANGE
    Around the world, many people and communities face barriers to justice. Through our pro bono work, we help children, asylum seekers, refugees and other under-served groups get the legal support, access to justice and fair treatment they need and deserve. 
    We also give free advice to nonprofits, UN agencies, intergovernmental organizations and social enterprises. This allows them to focus on their missions and key objectives. And we support social and economic development, sound legal institutions and women's advancement in under-resourced regions.
    
    Building an inclusive culture
    We’re all different, and those differences are our greatest strength. Everyone should feel valued for who they are. We take meaningful action to create an inclusive culture in our business, and make a positive difference to our communities. We’ve made progress, but there’s a lot more to do. The legal sector still isn’t diverse enough.
    Firms that fail to take action to improve diversity aren’t just reinforcing social inequalities in the legal profession and wider society. They’re also putting at risk their innovation and competitiveness. Our materiality assessment ranked diversity, mobility and inclusion as our second-highest-rated issue.
    
    CELEBRATING OUR DIVERSITY
    Embracing diversity strengthens us and inclusivity enables everyone to thrive. But there’s more to do. So we’re listening, learning and taking meaningful action to make a positive difference in our business and our communities.
    We’re amplifying the voices of our people and empowering them to fulfill their potential. We do this so we can build the best teams, help our clients succeed, and nurture a culture where everyone feels they belong.`

    const text2 = `Your global partner in reimagining healthcare
    We solve complex problems for some of the world’s most innovative healthcare companies.From navigating evolving regulatory environments to facilitating transformative transactions, our flexible and forward - thinking approach helps you mitigate risk and achieve your goals.
    
    The highly regulated healthcare industry is changing rapidly, driven by technological innovation, shifting payment models, and widespread consolidation and integration.Our clients rely on our broad industry knowledge, experience in healthcare regulation and deep understanding of their businesses to navigate these changes.
    
    Healthcare transformation requires creative thinking and bold solutions.As you grow and innovate, we’ll support you at every stage.Clients choose us because our lawyers translate complex legal topics into clear guidance and insight that helps them succeed.
    
    We work with a wide range of healthcare clients around the world.They include entrepreneurs, private equity, venture capital, SPACs and other investors, payors, physicians, hospitals and health systems, pharmacies, laboratories, home health, skilled care and other healthcare facilities, medical device, health technology companies, and digital health innovators.
    
    With offices worldwide and a broad range of practice groups, we’ll take a multijurisdictional and cross - discipline approach to addressing your most complex issues.Together, we’ll guide you through growth and change.

    Pioneers in technology law, partnering with today’s tech trailblazers
    You anticipate changes and seize opportunities.We bring relationships, experience, and insight to help technology leaders thrive.
    FROM GARAGE TO GLOBAL
    
    You can call on our top - ranked team to advise throughout your entire business lifecycle.We meet you where you are, from garage to global.We understand the technology you own and use.And we’re where you need us to be – in the world’s largest tech hubs.We spot opportunities, track best practices and regulatory trends, and help you succeed.

        Our 600 - lawyer tech group handles corporate transactions ranging from emerging growth and venture capital to M & A, private equity and capital markets.We advise on IP issues including technology transfers, inbound and outbound licensing and distribution, outsourcing, privacy and government contracts.
    
    We work on fintech and blockchain counseling on NFTs, cryptocurrency and digital payments, and litigation, including IP and regulatory.We know the players framing new regulations for AI, cryptocurrency, IoT and wireless devices, autonomous vehicles, and data privacy and management.Our relationships with lawmakers, combined with our experience, help us predict and prevent risks and uncover opportunities.
    
    In addition, our team helps ensure your innovations and products are protected and profitable using global risk mitigation strategies in intellectual property, consumer class action, and other technology disputes.Our lawyers are experienced technology trial lawyers with an exceptional win rate.We know the laws, courts, and jurisdictions where most technology disputes occur, and can explain complex technologies to judges and juries to increase the probability of success in any case. We are known for our ability to manage high - risk cases across multiple venues in the US and worldwide for the world’s leading technology companies.
    
    We can also guide you on evolving best practices for sustainability and environmental, social, and governance issues when considering new ventures, such as alternative supply chains and payment ecosystems.And we can help you report your ESG milestones in your corporate and social responsibility reports.
    
    For decades, clients have trusted us for technology matters.We’re a pioneer in the field, launching in the heart of Silicon Valley more than 50 years ago with our predecessor firm, Gray Cary Ware & Freidenrich LLP, one of the original Silicon Valley law firms.
    
    Helping the industry innovate in a changing environment
    Accelerating the energy transition will require virtually every business, particularly those in the energy and natural resources industry, to innovate and adapt to build a better future.We support you in tackling these challenges, seizing opportunities in an uncertain environment.  
    The energy and natural resources industry faces fresh challenges every day.A highly volatile and uncertain market is fraught with increasing regulation, price shifts, supply chain issues and geopolitical disruptions.You’re looking for new technologies, innovative ways of doing business, efficiencies and market breakthroughs – such as hydrogen – to reshape your business and shift to a more sustainable future. 
    
    Our Energy and Natural Resources team understands this fundamental change and how it affects your business, whether you are in the power, renewables, mining, commodities trading, oil and gas, waste, water or hydrogen markets.We advise the regulators, the regulated, investors, developers and other key industry stakeholders, including governments.  
    
    Our team walks alongside you during your project lifecycle including: inception, development, completion, operation and sale.We cover the legal, geographical, commercial and geopolitical aspects of your business across its entire value chain.  
    
    We handle the full spectrum of your legal needs in the industry, from finance and project development to regulatory, corporate transactional, restructuring and dispute resolution.Our lawyers approach every issue with sustainability and ESG in mind.

        With 400 + lawyers in over 40 countries, we can help you wherever you do business.We become a part of your team and your decision - making process, sharing insights about what shareholders need and what’s trending.  
    
    We are both advocates for our clients and players in the industry.So we know what it’s like to walk in your shoes.For example, when we advise you on corporate power purchase agreements, we bring to the table our own experience as the first law firm in the world to have signed one as off - takers.
    
    `
    const text3 = `Global M & A dealmakers by your side
    Mergers, acquisitions and divestitures are a catalyst for business transformation.Our lawyers help you manage this change.With forward - thinking advice, we guide you through deal risks and onto the opportunities beyond closing.
    Ranked #1 for global M & A by deal count for 14 years, we've handled 8,500+ transactions valued at more than USD1.4 trillion in total, making us the leader for global M&A. We know the commercial drivers of your transactions are unique, so we take a bespoke approach. You get pragmatic, commercial advice, however complex your deals, paving the way for a successful transaction.
    
    Completing your M & A deal brings all kinds of challenges, from fluctuating economic environments to tightening regulatory regimes.We anticipate and address any issues that come up to help you adapt and comply.We act for all types of buyers, sellers and financial advisors, including public and private companies, private equity, venture investors and management teams.
    
    We act on more M & A deals than any other law firm.In 2023 alone we advised on over a thousand transactions worldwide, valued at over USD60 billion in total.And we cover every stage – from strategic planning through to post - close integration.We also advise on joint ventures and strategic alliances.

        Our 1,000 + corporate lawyers are based in the jurisdictions where you do business.We offer an unrivalled combination of geographic coverage and specialist practice area advice, going to market in sector - focused teams covering industries such as technology, consumer goods, life sciences / healthcare, industrials, infrastructure and media, sports and entertainment and financial services.You get lawyers who know how your sector operates and its market pressures.They understand the dynamics; they know your objectives; they mitigate the risks.
    
    We offer our clients unique insights into market trends and developments, leveraging the extensive data we have curated by doing more M & A deals than any other law firm.These insights include pricing mechanisms, earn - out terms, seller protections, the latest developments in deal insurance, insights into how dealmakers manage risks between signing and closing, how trends differ between markets and much more.
    
    For any deal, whether you’re the buyer or seller, our focus is to make sure you succeed, both at the time of transacting and post - close.Working with lawyers across our global platform, you’ll enter new markets with confidence.
    
    Exceptional service for exceptional results
    With a pragmatic approach and a steady hand, our global team executes the best dispute resolution strategies for your company.We are your partner in every sense of the word, fully invested in your success no matter where in the world you need us.
    Your business objectives and legal strategies are intricately interconnected.Clients ask us to manage their disputes that affect their most significant business opportunities and challenges because we understand their commercial priorities as well as the legal and regulatory risks where high - stakes litigation, arbitration and investigations are concerned.
    Our team helps you efficiently resolve your dispute – whether that’s through requesting an early settlement in litigation or representing you throughout arbitration proceedings.Our solutions are tailored to your needs.  
    We also keep you informed on market trends.We’re seeing a rise in large - scale litigation, class actions and collective redress and cases that challenge our clients’ core business.
    This includes issues stemming from geopolitical tensions, supply chain disruption and global disruptors such as COVID - 19 and the global economic downturn.Increasing regulatory activity has pushed our clients to address both policy and procedural requirements and has fueled an exponential increase in internal and regulator - driven investigations.  
    
    Issues linked to sustainability and ESG matters are surging.Alongside the decarbonizing of operations and supply chains, cases range from environmental litigation and related class actions to parent company liability and greenwashing. 
    
    The sheer volume of diverse matters we’ve handled successfully allows us to provide unique insight.We handle complex matters efficiently through matter management and budget tracking, proprietary AI platforms, cutting - edge technology and project management tools.  
    
    With a local presence in over 40 countries including all of the key global business markets, our team understands the legal, business and cultural influences on your litigation, arbitration and investigation matters in virtually every jurisdiction.
    With one of the largest and most sophisticated teams of disputes lawyers globally, we can manage large - scale challenges efficiently around the world, including complex global investigations and multijurisdictional, collective litigation and arbitration matters.  
    
    Commercially minded finance advice
    Global financial markets change with market dynamics, yet our job remains to help you realize your finance and investment strategies regardless of the current landscape.Our lawyers track new laws, market conditions, and financial products.We balance this with local, legal insight and sector - focused commercial sense to protect your interests in full.

        Companies, financial institutions, and investment managers turn to us for their critical finance transactions.These range from investment vehicle formation, across the entire fund value chain, leveraged finance, securitization and structured finance projects to debt capital markets transactions and project finance.
    
    We also advise on distress situations across all of these types of transactions.What we do is often big - ticket and cross border, bringing challenges depending on your sector and the jurisdictions involved. 
    
    We do everything to help you achieve your finance goals, whether you’re an asset manager, a fund sponsor, investor, lender or borrower.
    Ongoing regulatory and market changes are inevitable.We stay on top of how these might affect you and solve the issues they raise, researching trends and new technologies to give you the best advice. 
    
    We advise you on financing across borders, sectors, and products, and help you overcome the legal, commercial, and political constraints of the countries you do business in.

        We’re a versatile team.Our 700 + finance lawyers are in the leading financial centers, from New York and London to Shanghai and Singapore.We advise on all types of domestic and international transactions, and of every size.We’ve acted for clients in new markets and on thousands of deals. 
    
    Clients say we’re commercially minded and come up with ideas that work for their businesses.
    `

    const company = 'Elite Law Firm';
    const mission = `Innovative, supportive, collaborative, bold, excpetional`

    const text = `${text1}\nn${text2}\nn${text3}\nn`
    const p = `
    •	The user wants to develop a style guide, based on company mission and values and existing samples.
    •	The user enters the following:
    o	Company vision
    o	Core values
    o	3 samples of writing (each piece no more than 1000 words)
    •	The prompt (not shown) is as follows:
    o	You are a leading copywriter with more than 20 years of experience in writing high-performing copy, and with expertise in linguistics, natural processing, decision making, persuasion, psychology, behavioral economics, marketing, sales, UX design, customer experience, branding, and conversion rate optimization. Pretend that you are also highly empathetic and understand how people think and what makes them tick.
    
    You're an expert on human emotions, behavior, and language. You can easily and expertly detect personality, thoughts, subtle style and voice details, including mimicking any voice, tone, style, jargon and sentiment of any text. Based on provided texts, generate detailed brand voice and tone guidelines.  
    
    Your guidelines should outline the necessary steps and considerations for replicating the identified tone of voice. Ensure that the guidelines are straightforward enough for the copywriter to use as a direct guide in their work. While creating the guidelines, stay true to the provided core values and vision.
    
    Include the following, in this order as bullet points:
    ⎼	Introduction: What are brand voice & tone guidelines, what’s their purpose, how they help and why we’re using them.
    ⎼	3 or 4 Voice & Tone Guiding principles that help bring the brand to life
    ⎼	For each of the guiding principles list: What it means, How it affects our writing, Example best practice copy, What not to do in the copy, and Examples of incorrect copy.
    ⎼	Vocabulary: Describe the word choice so others, even non copywriters, can mirror it
    ⎼	Tone: Describe the emotion in the copy so others, even non copywriters, can mirror it
    ⎼	Cadence: Describe the rhythm of the writing so others, even non copywriters, can mirror it
    ⎼	Marketing channels: identify tonal cues that apply to different marketing chanels
    `
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();
    //     console.log('Form values:', formData);
    //     const prompt = `You are a leading copywriter with more than 20 years of experience in writing high-performing copy, and with expertise in linguistics, natural processing, decision making, persuasion, psychology, behavioral economics, marketing, sales, UX design, customer experience, branding, and conversion rate optimization. Pretend that you are also highly empathetic and understand how people think and what makes them tick.\n    
    //     You're an expert on human emotions, behavior, and language. You can easily and expertly detect personality, thoughts, subtle style and voice details, including mimicking any voice, tone, style, jargon and sentiment of any text. Based on provided texts, generate detailed brand voice and tone guidelines.\n
    //     Your job is use below 3 samples of writing that includes company mission, values and sample tone and create a style guide in JSON format for company ${formData.companyName} with mission text ${formData.coreValues}, Include the following, in this order as bullet points:
    //     ⎼	Introduction: What are brand voice & tone guidelines, what’s their purpose, how they help and why we’re using them.
    //     ⎼	3 or 4 Voice & Tone Guiding principles that help bring the brand to life
    //     ⎼	For each of the guiding principles list: What it means, How it affects our writing, Example best practice copy, What not to do in the copy, and Examples of incorrect copy.
    //     ⎼	Vocabulary: Describe the word choice so others, even non copywriters, can mirror it
    //     ⎼	Tone: Describe the emotion in the copy so others, even non copywriters, can mirror it
    //     ⎼	Cadence: Describe the rhythm of the writing so others, even non copywriters, can mirror it
    //     ⎼	Marketing channels: identify tonal cues that apply to different marketing chanels
    // `
    //     let gptConfig = {
    //     method: 'post',
    //     maxBodyLength: Infinity,
    //     url: '/api/gpt-edge',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     data: JSON.stringify({
    //         prompt,
    //         text,
    //     })
    //     };
    //     let response = await axios.request(gptConfig);

    //     setStyle(response.data.answer);
    //     setCost(response.data.cost);

        const parsedText = parseJson(jsonData);
        setFileContent(parsedText);
        setLoading(false);        
    };

    const [formData, setFormData] = useState({
        companyName: company,
        coreValues: mission,
        sampleText1: text1,
        sampleText2: text2,
        sampleText3: text3
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };



    const [fileContent, setFileContent] = useState< React.ReactNode | undefined>('');
  
    function parseJson(json: any): React.ReactNode {
      function traverse(obj: any, depth: number = 0): React.ReactNode {
        if (Array.isArray(obj)) {
          return obj.map((item, index) => (
            <div key={index}>
              {traverse(item, depth)}
            </div>
          ));
        } else if (typeof obj === 'object' && obj !== null) {
          return (
            <div key={depth} className='py-4 text-lg'>
              {Object.keys(obj).map((key) => (
                <div key={key}>
                  <b>{key}</b>: {traverse(obj[key], depth + 1)}
                </div>
              ))}
            </div>
          );
        } else {
          return obj;
        }
      }
      return traverse(json);
    }
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          console.log('file loaded')
          if (e.target?.result) {
            setStyle((prev)=>JSON.parse(e.target.result as string))            
            const parsedText = parseJson(style);
            setFileContent(parsedText);
            }
        };
        reader.readAsText(file);
      }
    };

    const saveFile = (fileContent: string, fileName: string, fileExtension: string) => {
        const styleObject = JSON.parse(style);
        const blob = new Blob([JSON.stringify(styleObject, null, 2)], { type: 'application/json' });
        saveAs(blob, `${fileName}.${fileExtension}`);
    };

    const handleSaveClick = () => {
        saveFile(JSON.stringify(fileContent), 'style-guide', 'stg');
      };
    

    if( fileContent){
        return (<div className="container mx-auto p-16">
        <form onSubmit={handleSubmit} className="border border-gray-300 rounded px-16 py-4">
            <div className="flex justify-center">
                <Label className="font-bold py-2 px-4 rounded text-2xl">Recommended Style Guide <p className='text-sm font-small'>{cost}</p></Label>
            </div>
            <div className="mb-2">
                {fileContent}
                {/* <Textarea rows={40} value={style} id="sampleText1" name="sampleText1" className={`border ${errors.sampleText1 ? 'border-red-500' : 'border-gray-300'} rounded w-full p-2`} />
                {errors.sampleText1 && <p className="text-red-500">Sample Text 1 is required</p>} */}
            </div>
            <div className="flex justify-center space-x-2 mt-4">
                <Button type="button" className="font-bold py-2 px-4 rounded" onClick={() => setFileContent('')}>Back</Button>
                <Button type="submit" className="font-bold py-2 px-4 rounded" onClick={handleSaveClick}>Save</Button>
            </div>
        </form>
    </div>)
    }
    
    if (style) {                       
        return (
            <div className="container mx-auto p-16">
                <form onSubmit={handleSubmit} className="border border-gray-300 rounded p-16">
                    <div className="flex justify-center">
                        <Label className="font-bold py-2 px-4 rounded text-lg">Recommended Style Guide <p className='text-sm font-small'>{cost}</p></Label>
                    </div>
                    <div className="mb-2">
                        <Textarea rows={40} value={style} id="sampleText1" name="sampleText1" className={`border ${errors.sampleText1 ? 'border-red-500' : 'border-gray-300'} rounded w-full p-2`} />
                        {errors.sampleText1 && <p className="text-red-500">Sample Text 1 is required</p>}
                    </div>
                    <div className="flex justify-center space-x-2 mt-4">
                        <Button type="button" className="font-bold py-2 px-4 rounded" onClick={() => setStyle('')}>Back</Button>
                        <Button type="submit" className="font-bold py-2 px-4 rounded">Save</Button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-16">
            <form onSubmit={handleSubmit} className="border border-gray-300 rounded p-16">
                <div className="flex justify-center">
                    <Label className="font-bold py-2 px-4 rounded text-lg">Generate Style Guide</Label>
                </div>
                <div className="mb-4">
                    <Label htmlFor="companyName" className="block">Company Name</Label>
                    <Input id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} className={`border ${errors.companyName ? 'border-red-500' : 'border-gray-300'} rounded w-full p-2`} />
                    {errors.companyName && <p className="text-red-500">Company Name is required</p>}
                </div>
                <div className="mb-2">
                    <Label htmlFor="coreValues" className="block">Core Values</Label>
                    <Textarea id="coreValues" value={formData.coreValues} onChange={handleChange} name="coreValues" placeholder='Your company values e.g. Your global partner in reimagining healthcare' className={`border ${errors.coreValues ? 'border-red-500' : 'border-gray-300'} rounded w-full p-2`} />
                    {errors.coreValues && <p className="text-red-500">Core Values are required</p>}
                </div>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className={` ${errors.sampleText1 ? 'text-red-500' : ''}`}>Sample Text 1</AccordionTrigger>
                        <AccordionContent>
                            <Textarea rows={20} value={formData.sampleText1} onChange={handleChange} id="sampleText1" name="sampleText1" className={`border ${errors.sampleText1 ? 'border-red-500' : 'border-gray-300'} rounded w-full p-2`} />
                            {errors.sampleText1 && <p className="text-red-500">Sample Text 1 is required</p>}
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className={` ${errors.sampleText2 ? 'text-red-500' : ''}`}>Sample Text 2</AccordionTrigger>
                        <AccordionContent>
                            <Textarea rows={20} value={formData.sampleText2} onChange={handleChange} id="sampleText2" name="sampleText2" className={`border ${errors.sampleText2 ? 'border-red-500' : 'border-gray-300'} rounded w-full p-2`} />
                            {errors.sampleText2 && <p className="text-red-500">Sample Text 2 is required</p>}
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className={` ${errors.sampleText3 ? 'text-red-500' : ''}`}>Sample Text 3</AccordionTrigger>
                        <AccordionContent>
                            <Textarea rows={20} value={formData.sampleText3} onChange={handleChange} id="sampleText3" name="sampleText3" className={`border ${errors.sampleText3 ? 'border-red-500' : 'border-gray-300'} rounded w-full p-2`} />
                            {errors.sampleText3 && <p className="text-red-500">Sample Text 3 is required</p>}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <div className="flex justify-center space-x-2 mt-4">
                    <Button type="button" className="font-bold py-2 px-4 rounded" onClick={() => router.back()}>Back</Button>
                    <Button type="submit" className="font-bold py-2 px-4 rounded">{loading ? <BeatLoader color={'#ffffff'} /> : <p>Generate Style Guide</p>}</Button>
                    <div className="flex justify-center space-x-2" >
                    <input
                    type="file"
                    accept=".stg"
                    onChange={handleFileChange}
                    className="hidden"
                    id="styleGuideFile"
                    name="styleGuideFile"
                />
                <Button
                    type="button"
                    className="font-bold py-2 px-4 rounded"
                    onClick={() => document.getElementById('styleGuideFile')?.click()}
                >
                    Load Style Guide
                </Button>
                </div>                    
                </div>
            </form>
        </div>
    );
}
