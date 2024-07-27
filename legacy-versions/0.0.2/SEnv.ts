class SEnv {
  public giphyKey!: string;

  public init(options: {
    giphyKey: string;
  }) {
    this.giphyKey = options.giphyKey;
  }
}

export default new SEnv();
