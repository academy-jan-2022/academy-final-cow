import { storageHandler } from "./StorageHandler";

const mockedGetItem = jest.fn();
const mockedSetItem = jest.fn();
const mockedClear = jest.fn();
const mockedRemoveItem = jest.fn();

const localStorageMock = (function () {
  return {
    getItem: mockedGetItem,
    setItem: mockedSetItem,
    clear: mockedClear,
    removeItem: mockedRemoveItem,
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

const APPLE_ITEM = "apple";

describe("StorageHandler should", () => {
  test("set item in localstorage", async () => {
    const appleObject = { fruit: APPLE_ITEM };

    storageHandler.setJSONItem(APPLE_ITEM, appleObject);
    expect(localStorageMock.setItem).toBeCalledWith(
      APPLE_ITEM,
      JSON.stringify(appleObject)
    );
  });

  test("get item from localstorage", async () => {
    storageHandler.getJSONItem(APPLE_ITEM);
    expect(localStorageMock.getItem).toBeCalledWith(APPLE_ITEM);
  });

  test("remove item from localstorage", async () => {
    storageHandler.removeItem(APPLE_ITEM);
    expect(localStorageMock.removeItem).toBeCalledWith(APPLE_ITEM);
  });
});
