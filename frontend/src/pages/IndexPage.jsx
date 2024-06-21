import BusinessPartners from "../components/IndexPage-Components/BusinessPartners";
import Footer from "../components/IndexPage-Components/Footer";
import LandingPage from "../components/IndexPage-Components/Landing";
import Navbar from "../components/IndexPage-Components/Navbar";

export function IndexPage() {
    return (
        <div>
            <Navbar />
            <LandingPage />
            <BusinessPartners />
            <Footer />
        </div>
    )
}

