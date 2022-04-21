import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import {storageHandler} from "./infrastructure/StorageHandler";

interface PropType {
    component: React.FC;
}

const ProtectedRoute: FC<PropType> = ({ component: Component }) => {
    const userIsLoggedIn = () => {
        const tokenObject = storageHandler.getJSONItem("tokenObject");
        return !!tokenObject;
    };

    if (userIsLoggedIn()) {
        return <Component />;
    }
    return <Navigate to='/' />;
};

export default ProtectedRoute;