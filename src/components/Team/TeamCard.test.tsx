import React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import TeamCard from "./TeamCard";


const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedUsedNavigate,
}));

describe("HomePage test should", () => {
    const teamId = "1"
    const teamName = "ECA"

    beforeEach(() => {
        
        render(
            <BrowserRouter>
                    <TeamCard id={teamId} name={teamName} />
            </BrowserRouter>
        );
    });


    test('Check if team name is rendered', () => {
        const teamName = screen.getByText("ECA");
        expect(teamName).toBeInTheDocument();
    });

    test('Navigate to team page when clicking on team card', async () => {
        const card = screen.getByText("ECA");
        card.click();
        await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalledWith(`/teams/${teamId}`));
    })
})