import {Container} from "../components/Container";
import {Link} from "react-router-dom";
import {Icon} from "../components/Icon";

export function About() {
    return (
        <div className="flex flex-col w-full">
            <div className="h-1/5 bg-[#0E1422] text-white p-10 flex">
                <Link to="/"><Icon name="arrowLeft"/></Link>
                <Container>
                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl font-bold uppercase">Ani Maghradze</h1>
                        <p>Junior Front-end React Developer</p>
                        <p>Tbilisi, Georgia | animaghradze50@gmail.com | +995 598 40 24 16 | <Link
                            to="https://github.com/Anni-Bunny" className="text-blue-300"
                            target="_blank">GitHub</Link> | <Link to="https://www.linkedin.com/in/ani-maghradze/"
                                                                  className="text-blue-300"
                                                                  target="_blank">LinkedIn</Link></p>
                    </div>
                </Container>
            </div>

            <Container>
                <div className="pt-5 pb-16 px-10 flex flex-col gap-8 w-full">
                    <div className="flex flex-col gap-5">
                        <h3 className="text-lg text-blue-800 font-bold border-b py-2">Education</h3>
                        <p className=" flex justify-between">
                        <span>
                            <span className="font-bold">Digital Institute,</span> Frontend Web Development React Course
                        </span>
                            <span className="font-bold">Mar 2024 - Dec 2024</span>
                        </p>

                        <p className="pl-8">
                            <span className="font-bold">Course includes:</span> HTML | CSS | JavaScript | Bootstrap |
                            ReactJS Framework
                        </p>

                        <p className=" flex justify-between">
                            <span className="font-bold">C++ Programming course</span>
                            <span className="font-bold">June 2023 - Sep 2023</span>
                        </p>

                        <p className=" flex justify-between">
                        <span>
                            <span className="font-bold">USAID Georgia,</span> School of young entrepreneurs
                        </span>
                            <span className="font-bold">Mar 2023- May 2023</span>
                        </p>

                        <p className=" flex justify-between">
                        <span>
                            <span className="font-bold">Caucasus University,</span> Bachelor of Public Administration and Governance
                        </span>
                            <span className="font-bold">Sep 2018 - Aug 2022</span>
                        </p>

                        <p className="pl-8">
                            <span className="font-bold">Course includes:</span> Principles of Law | Constitutional Law |
                            Administrative Law | E-governance | Project
                            Management | Data analysis | Research Methods | Statistical Reasoning | Quantitative
                            Reasoning | Database Administration | Human Resources Management.
                        </p>
                    </div>

                    <div className="flex flex-col gap-5">
                        <h3 className="text-lg text-blue-800 font-bold border-b py-2">Work Experience </h3>

                        <p className=" flex justify-between">
                            <span className="font-bold">Freelancer</span>
                            <span className="font-bold">June 2024 - Today</span>
                        </p>

                        <p className="pl-8 flex flex-col gap-2">
                            <span className="font-bold">My Projects:</span>
                            <ul className="list-disc ml-5">
                                <li>Ecommerce Website | </li>
                                <li>Guess My Number | <Link to="https://anni-bunny.github.io/guess_my_number_js/" className="text-blue-500 font-bold" target="_blank">View More</Link></li>
                                <li>Pig Game | <Link to="https://anni-bunny.github.io/pig_game/" className="text-blue-500 font-bold" target="_blank">View More</Link></li>
                                <li>Modal Window | <Link to="https://anni-bunny.github.io/Modal_Window_js/" className="text-blue-500 font-bold" target="_blank">View More</Link></li>
                            </ul>
                        </p>

                        <p className=" flex justify-between">
                        <span>
                            <span className="font-bold">Evolution Georgia</span> English speaking game presenter
                        </span>
                            <span className="font-bold">Dec 2021 - Jan 2023</span>
                        </p>

                    </div>

                    <div className="flex flex-col gap-5">
                        <h3 className="text-lg text-blue-800 font-bold border-b py-2">Technical Skills and
                            Languages </h3>

                        <p>
                            <span className="font-bold">programming languages | </span> JavaScript, TypeScript, C++, SQL
                        </p>

                        <p>
                            <span className="font-bold">Front End | </span> HTML, CSS, Tailwind CSS, Bootstrap, ReactJS
                            Framework, Redux Toolkit
                        </p>

                        <p>
                            <span className="font-bold">Developer Tools |  </span> Git, GitHub
                        </p>
                    </div>

                    <div className="flex flex-col gap-5">
                        <h3 className="text-lg text-blue-800 font-bold border-b py-2">Languages </h3>
                        <p>Georgian (Native), English (B2), Russian (A2)</p>
                    </div>


                </div>
            </Container>


        </div>
    );
}

