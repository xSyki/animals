import { fireEvent, render } from "@testing-library/react";

import TableExchange from "../TableExchange/TableExchange";

function renderTableExchange() {
  const utils = render(<TableExchange />);
  const openTableBtn = utils.getByTitle(/Open table/i);
  return { ...utils, openTableBtn };
}

describe("Table Exchange Component", () => {
  test("Do Table Exchange exist", () => {
    const { openTableBtn, getByTitle, container } = renderTableExchange();
    expect(openTableBtn).toBeInTheDocument();

    fireEvent.click(openTableBtn);
    expect(getByTitle(/Close table/i)).toBeInTheDocument();

    const tableOffers = container.getElementsByClassName("table__offer");
    expect(tableOffers.length).toBe(6);
    for (let i = 0; i < 6; i++) {
      expect(tableOffers[i]).toBeInTheDocument();
      expect(tableOffers[i].firstChild?.firstChild?.nodeValue).toMatch(/[1-6]/);
      expect(tableOffers[i].lastChild?.firstChild?.nodeValue).toMatch(/[1-6]/);
      expect(tableOffers[i].getElementsByTagName("svg").length).toBe(1);
      expect(tableOffers[i].getElementsByTagName("img").length).toBe(2);
    }
  });

  test("Open and close Table Exchange", () => {
    const { openTableBtn, getByTitle } = renderTableExchange();
    expect(openTableBtn).toBeInTheDocument();

    fireEvent.click(openTableBtn);
    const closeTableBtn = getByTitle(/Close table/i);
    expect(closeTableBtn).toBeInTheDocument();

    fireEvent.click(closeTableBtn);
    expect(getByTitle(/Open table/i)).toBeInTheDocument();
  });
});
