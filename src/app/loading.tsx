import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Loading() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Header />
            <div className="mx-auto mt-10 max-w-xs sm:flex sm:max-w-none sm:justify-center">
                <h2>Loading...</h2>
            </div>
            <Footer />
        </main>
    );
}