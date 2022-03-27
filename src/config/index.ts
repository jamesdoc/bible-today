export interface IdbConfig {
  esv_audio_url: string;
}

export const conf: IdbConfig = {
  esv_audio_url: `https://audio.esv.org/david-cochran-heath/mq/{{READINGS}}.mp3?include-passage-headings=true`,
};
