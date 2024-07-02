import Link from "next/link";
import logo from "@/assets/logo.png";
import classes from './MainHeader.module.css';
import Image from "next/image";
import MainHeaderBackground from "./MainHeaderBackground";
import NavLink from "./NavLink";

export default function MainHeader() {

    return (
        <>
            <MainHeaderBackground />
            <header className={classes.header}>
                <Link className={classes.logo} href={'/'}>
                    <Image src={logo} alt="A plate with food on it" priority/>
                    NextLevel Food
                </Link>

                <nav className={classes.nav}>
                    <ul>
                        <NavLink href="/meals">Browse Meals</NavLink>
                        
                        <NavLink href="/community">Foodies Community</NavLink>
                        
                    </ul>
                </nav>
            </header>
        </>
    )
}