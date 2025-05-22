import Container from "../components/Container/Container.jsx";
import { FavoritesPanel, QuestionListPanel } from "../components/index.js";

const MyList = () => {
    return (
        <div className="min-h-screen bg-gray-900">
            <Container className="bg-gray-900 flex p-10">
                <FavoritesPanel />
                <QuestionListPanel />
            </Container>
        </div>
    );
};

export default MyList;
