import React, {Component} from 'react';
import phone2 from '../assets/p2.png';
import phone3 from '../assets/p3.png';
import phone4 from '../assets/p4.png';
import phone5 from '../assets/p5.png';
import HeroBlock from '../Components/HeroBlock/HeroBlock';
import '../css/Hem.css';
import PhoneBlock from "../Components/PhoneBlock/PhoneBlock";
import BlueBlock from "../Components/BlueBlock/BlueBlock";
import TitleAndSubtitle from "../Components/TitleAndSubtitle/TitleAndSubtitle";
import ContentBlocks from "../Components/ContentBlocks/ContentBlocks";
import FAQBlock from "../Components/FAQBlock/FAQBlock";

export default class Hem extends Component {
    render() {
        return (

            <>
                <div className="HemPageDark">
                    <HeroBlock/>
                </div>


                <div className="HemPageLight d-flex flex-column  justify-content-center align-items-center gap-1">

                    <TitleAndSubtitle
                        variant="white"
                        align="center"
                        title="We know what problems you have"
                        subtitle=""
                    />

                    <PhoneBlock
                        image={phone2}
                        title="Auto Time Tracking"
                        text="GPS-based check-in/check-out, automatic shift logs. Export to Excel in 3 clicks."

                    />

                    <PhoneBlock
                        image={phone3}
                        title="Photo Reports"
                        text="Workers upload jobsite photos right in the app. You get instant proof of progress."
                        reverse
                    />

                    <PhoneBlock
                        image={phone4}
                        title="Project info in one place"
                        text="Tasks, drawings, and files stored per project. Everything in the right hands."
                    />

                    <PhoneBlock
                        image={phone5}
                        title="No mess, no distractions"
                        text="Create project-specific groups, so conversations stay focused and nothing gets lost. No personal chats like in WhatsApp — only clearly organized work chats."
                        reverse
                    />

                    <BlueBlock>

                        <TitleAndSubtitle
                            variant="blue"
                            title={<>We'll bulid custom features<br/>specifically for your workflow</>}
                            subtitle="Just tell us what your team needs — and we’ll implement it shortly. "
                        />

                    </BlueBlock>


                </div>

                <div className="HemPageDark">

                    <ContentBlocks/>
                    <FAQBlock/>

                </div>


            </>
        );
    }
}
