import { storageHandler } from "../../../src/services/infrastructure/StorageHandler";

const mockedGetItem = jest.fn();
const mockedSetItem = jest.fn();
const mockedClear = jest.fn();
const mockedRemoveItem = jest.fn();

const localStorageMock = (function () {
  let store: { [key: string]: string } = {};
  return {
    getItem: mockedGetItem,
    setItem: mockedSetItem,
    clear: mockedClear,
    removeItem: mockedRemoveItem,
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

test("set item in localstorage", async () => {
  const appleObject = { fruit: "apple" };

  storageHandler.setJSONItem("apple", appleObject);
  expect(localStorageMock.setItem).toBeCalledWith(
    "apple",
    JSON.stringify(appleObject)
  );
});

test("get item in localstorage", async () => {
  const appleObject = { fruit: "apple" };

  storageHandler.getJSONItem("apple");
  expect(localStorageMock.getItem).toBeCalledWith("apple");
});

test("remove item in localstorage", async () => {
  storageHandler.removeItem("apple");
  expect(localStorageMock.removeItem).toBeCalledWith("apple");
});
