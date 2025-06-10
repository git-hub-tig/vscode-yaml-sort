import { GenericProcessor } from "./generic-processor"
import { Logger } from "../util/logger"

export class AnchorProcessor extends GenericProcessor {
  private anchorMap: Map<string, string> = new Map();
  
  constructor(text: string) {
    super("anchor", /&\w+|\*\w+/g, text)
  }

  preprocess() {
    // Store original anchor names
    this.text.replace(/&(\w+)/g, (match, name) => {
      Logger.log('Found anchor:', { name });
      this.anchorMap.set(name, name);
      return match;
    });
  }

  postprocess() {
    // Restore original anchor names
    this.text = this.text.replace(/[&*]ref_(\d+)/g, (match, num) => {
      const originalName = Array.from(this.anchorMap.keys())[parseInt(num)];
      Logger.log('Restoring anchor:', { 
        from: match, 
        to: originalName 
      });
      return match[0] + originalName; // Preserve & or * prefix
    });
  }
}