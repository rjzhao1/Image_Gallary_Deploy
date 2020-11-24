import React, { Component } from 'react';
import {AiFillLinkedin,AiFillGithub } from 'react-icons/ai';
import {FaAngellist} from 'react-icons/fa'
import {MdEmail} from 'react-icons/md'
import {BsPeopleCircle} from 'react-icons/bs'
import './css/Footer.css'
export default class Footer extends Component {

	render() {
		return (
			<div className="footer">
                <ul className="social-list">
                    <li className="social-list_item">
                        <a
                            href="https://www.linkedin.com/in/ricky-z/"
                            className="social-list_link"
                            target="_blank"
                        >
                            <AiFillLinkedin />
                        </a>
                        <a
                            href="https://github.com/rjzhao1"
                            className="social-list_link"
                            target="_blank"
                        >
                            <AiFillGithub />
                        </a>
                        <a
                            href="https://angel.co/u/ricky-zhao-2"
                            className="social-list_link"
                            target="_blank"

                        >
                            <FaAngellist />
                        </a>
                        <a
                            href="mailto:rizhao24@gmail.com"
                            className="social-list_link"
                            target="_blank"

                        >
                            <MdEmail />
                        </a>
                        <a href="https://rjzhao1.github.io" 
                            className="social-list_link"
                            target="_blank">
                            <BsPeopleCircle />
                        </a>
                    </li>
                </ul>
			</div>
		);
	}
}
