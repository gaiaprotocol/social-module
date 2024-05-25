import {
  AdaptiveModal,
  Button,
  ButtonType,
  DomNode,
  el,
  MaterialIcon,
} from "@common-module/app";
import { renderGrid } from "@giphy/js-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import SEnv from "../SEnv.js";

class GifSearchBar extends DomNode {
  private input: DomNode<HTMLInputElement>;

  constructor() {
    super("form.gif-search-bar");
    this.addAllowedEvents("search");

    this.append(el(
      "label",
      new MaterialIcon("search"),
      this.input = el("input", { placeholder: "Search for GIFs" }),
    ));

    this.onDom("submit", (event) => {
      event.preventDefault();
      this.emit("search", this.input.domElement.value);
    });
  }

  public search(query: string): void {
    this.input.domElement.value = query;
    this.emit("search", query);
  }
}

const categories = [{
  name: "LFG",
  thumbnail: "https://resources.gaia.cc/images/gif-categories/lfg.webp",
}, {
  name: "Agree",
  thumbnail: "https://resources.gaia.cc/images/gif-categories/agree.webp",
}, {
  name: "Awww",
  thumbnail: "https://resources.gaia.cc/images/gif-categories/awww.webp",
}, {
  name: "Do not want",
  thumbnail: "https://resources.gaia.cc/images/gif-categories/do-not-want.webp",
}, {
  name: "Eww",
  thumbnail: "https://resources.gaia.cc/images/gif-categories/eww.webp",
}, {
  name: "Fist bump",
  thumbnail: "https://resources.gaia.cc/images/gif-categories/fist-bump.webp",
}];

export default class SelectGifModal extends AdaptiveModal {
  private gf: GiphyFetch;
  private deleteGrid?: () => void;

  private searchBar: GifSearchBar;
  private categoryGrid: DomNode;
  private gifGrid: DomNode;
  private searchQuery: string | undefined;

  constructor() {
    super(".select-gif-modal", { barrierDismissible: true });
    this.addAllowedEvents("select");
    this.gf = new GiphyFetch(SEnv.giphyKey);

    this.title = "Select a GIF";
    this.main.append(
      el(
        ".gif-search-bar-container",
        new Button({
          type: ButtonType.Circle,
          icon: new MaterialIcon("arrow_back"),
          click: () => this.searchBar.search(""),
        }),
        this.searchBar = new GifSearchBar(),
      ),
      this.categoryGrid = el(".category-grid"),
      this.gifGrid = el(".gif-grid"),
    );

    this.renderCategories();

    this.searchBar.on("search", (query) => {
      this.categoryGrid.empty();
      this.searchQuery = query;
      this.deleteGrid?.();
      this.deleteGrid = undefined;
      this.renderGifs();
    });

    window.addEventListener("resize", this.resizeListener);
  }

  private renderCategories() {
    this.categoryGrid.empty().append(
      ...categories.map((c) =>
        el(
          ".category",
          el("h4.title", c.name),
          { click: () => this.searchBar.search(c.name) },
        ).style({
          backgroundImage: `url(${c.thumbnail})`,
        })
      ),
    );
  }

  private resizeListener = () => this.renderGifs();
  private renderGifs() {
    if (this.searchQuery) {
      const width = this.main.rect.width;
      this.deleteGrid = renderGrid({
        width,
        fetchGifs: (offset: number) =>
          this.gf.search(this.searchQuery ?? "", { offset, limit: 25 }),
        columns: width < 500 ? 2 : 3,
        gutter: 6,
        noLink: true,
        onGifClick: (gif) => {
          this.emit("select", gif.images.original.url);
          this.delete();
        },
      }, this.gifGrid.domElement);
    } else {
      this.renderCategories();
    }
  }

  public delete(): void {
    window.removeEventListener("resize", this.resizeListener);
    this.deleteGrid?.();
    super.delete();
  }
}
