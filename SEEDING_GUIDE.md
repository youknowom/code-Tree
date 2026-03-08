# Chapter Seeding Guide

## Overview

This script seeds chapters for all courses in the database.

## Courses Covered

- **Course 1**: JavaScript Basics (3 chapters)
- **Course 2**: HTML (12 chapters) - Already exists, use `/api/admin/save-chapters`
- **Course 3**: CSS Basics (3 chapters)
- **Course 4**: React Basics (3 chapters)
- **Course 5**: Python Basics (3 chapters)
- **Course 6**: Python Advanced (2 chapters)
- **Course 7**: Generative AI (2 chapters)
- **Course 8**: Machine Learning (2 chapters)

## How to Use

### Seed All Courses at Once

Navigate to:

```
http://localhost:3000/api/admin/seed-all-chapters
```

### Seed a Specific Course

Navigate to:

```
http://localhost:3000/api/admin/seed-all-chapters?courseId=1
```

Replace `1` with the course ID you want to seed (1-8).

## Next Steps

After seeding chapters, you need to:

1. Create exercise content in `/data/exercises.ts` for each course
2. Run `/api/admin/save-exercises` to push exercises to DB

## Database Schema

Chapters are stored with:

- `courseId`: The course this chapter belongs to
- `chapterId`: The chapter number within the course
- `name`: Chapter title
- `description`: Chapter description
- `exercises`: JSON array of exercise metadata (name, slug, xp, difficulty)
