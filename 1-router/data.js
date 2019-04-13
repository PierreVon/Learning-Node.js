#! /usr/bin/env node

console.log('此脚本为数据库填充一些测试藏书、作者、藏书种类、藏书类型。将数据库地址作为参数，比如：populatedb mongodb://your_username:your_password@your_dabase_url。');

// 从命令行取得参数
// const userArgs = process.argv.slice(2);
// if (!userArgs[0].startsWith('mongodb://')) {
//     console.log('错误：需要指定一个合法的 MongoDB URL 作为第一个参数。');
//     return;
// }

const async         = require('async');
const Book          = require('./models/book');

const mongoose      = require('mongoose');
const mongoDB       = 'mongodb://127.0.0.1:27017'
mongoose.connect(mongoDB);
mongoose.Promise    = global.Promise;

const db            = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB 连接错误：'));

const authors       = [];
const genres        = [];
const books         = [];
const bookinstances = [];


function bookCreate(title, summary, isbn, cb) {
    const book = new Book({
        title   : title,
        summary : summary,
        isbn    : isbn
    });

    book.save( err => {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('新建藏书：' + book);
        books.push(book);
        cb(null, book);
    });
}

function createBooks(cb) {
    async.parallel([
        callback => bookCreate(
            '史记',
            '《史记》是我国首部通史，是“二十四史”中极早的一部，也是极重要的一部史书。全书共一百三十篇。《史记》叙事，始自黄帝，下迄西汉太初，采用了综合性的叙事模式，囊括记言、纪事、编年、国别等形式，开创纪传体史书“纪、传、表、志”的体例。就内容而言，《史记》是对前代史学的一次总结；就体例而言，《史记》也是集大成之作。',
            '9787101103144',
            callback
        ),
        callback => bookCreate(
            '金瓶梅',
            '中国文学史上第一部由文人独立创作的长篇小说名著，在中国文学史上具有开拓性意义。小说借助宋朝旧事，以《水浒传》中武松杀嫂的故事为引子，通过对兼有官僚、恶霸、富商三种身份的市侩势力的代表人物西门庆及其家庭罪恶生活的描述，实际上展现的是明代中叶政治和社会的各种现象，深刻揭露了当时社会的黑暗和腐败，具有较高的认识价值。',
            '9787020131198',
            callback
        ),
        callback => bookCreate(
            '狂人日记',
            '本书收录了鲁迅的小说集《呐喊》和《彷徨》的全部篇幅。鲁迅的小说数量不多，却篇篇经典，其内容多取材于病态的现实社会，对国民灵魂、知识分子的命运进行了深刻思考，同时善于从国家、民族生死存亡的高度，来认识、发掘问题的内在本质，铸造典型的艺术形象，因而具有极高的艺术价值。鲁迅的作品，不愧为中国社会从辛亥革命到第1次国内革命战争时期的一面镜子，堪称现代文学的典范。',
            '9787544369480',
            callback
        ),
        callback => bookCreate(
            '朝花夕拾',
            '本书是一本具有鲜明的个性色彩的散文集。适性任隋、洒脱不羁，想说就说，想骂就骂，心中的种种爱憎悲欢，任其在笔下自然流泻。抒情、叙事和议论融为一体，优美和谐，朴实感人。',
            '9787514370829',
            callback
        ),
        callback => bookCreate(
            '丰乳肥臀',
            '记录百年中国风云变幻的恢宏“史诗”，经由一双婴儿的眼睛，目睹一个家族历的战争、贫穷、、荒淫。有爱有欲，有生有死，有人性的愚昧、贪婪，也有人情的温暖、博爱。无情，有情，疯癫——用一个故事看懂中国。',
            '9787533946630',
            callback
        ),
        callback => bookCreate(
            'Foundation',
            'The Foundation series is Isaac Asimov’s iconic masterpiece. Unfolding against the backdrop of a crumbling Galactic Empire, the story of Hari Seldon’s two Foundations is a lasting testament to an extraordinary imagination, one whose unprecedented scale shaped science fiction as we know it today.',
            '0008117497',
            callback
        )
    ], cb); // 可选回调
}

async.series (
    [
        createBooks
    ],
    // 可选回调
    (err, results) => {
        console.log('最终错误：' + err);
        // 操作完成，断开数据库连接
        db.close();
    }
);