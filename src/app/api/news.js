
export default function handler(req, res) {
    const newsList = [
      { id: 1, title: 'Tech Summit 2025', summary: 'Biggest tech event of the year' },
      { id: 2, title: 'Economy Growth', summary: '2025 Q1 shows great promise' },
    ];
    res.status(200).json(newsList);
  }
  