import crypto from 'crypto';

interface BlockShape {
  hash: string;
  prevHash: string;
  data: string;
  height: number;
}

class Block implements BlockShape {
  public hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }

  static calculateHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash('sha256').update(toHash).digest('hex');
  }
}

class Blockchain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }
  private getPrevHash() {
    if (this.blocks.length === 0) return '';
    return this.blocks[this.blocks.length - 1].hash;
  }
  public addBlock(data: string) {
    const newblock = new Block(
      this.getPrevHash(),
      this.blocks.length + 1,
      data
    );
    this.blocks.push(newblock);
  }

  public getBlocks() {
    //전개 구문을 사용함으로서
    //런타임에 getBlock 을 실행해 새 정보를 추가해도 기존 블록을 반환함
    return [...this.blocks];
  }
}

const blockChain = new Blockchain();

blockChain.addBlock('first one');
blockChain.addBlock('second one');
blockChain.addBlock('third one');
blockChain.addBlock('fourth one');

//
blockChain.getBlocks().push(new Block('xxx', 1111, 'heded'));

console.log(blockChain.getBlocks());
