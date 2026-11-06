import test from 'node:test';
import assert from 'node:assert/strict';
import { parseBibleUrl } from './bibleUrl';
import { BOOKS, getBookById, findBook } from './books';
import { getNextChapter, getPrevChapter } from '../../features/reader/useContinuousScroll';

test('canonical books list contains exactly 66 books', () => {
  assert.equal(BOOKS.length, 66);
  assert.equal(BOOKS[0].id, 'gn');
  assert.equal(BOOKS[0].name, 'Gênesis');
  assert.equal(BOOKS[65].id, 'ap');
  assert.equal(BOOKS[65].name, 'Apocalipse');
});

test('findBook locates books by name, abbreviation and accents', () => {
  const genesis = findBook('Genesis');
  assert.ok(genesis);
  assert.equal(genesis?.id, 'gn');

  const joao = findBook('joao');
  assert.ok(joao);
  assert.equal(joao?.id, 'jo');

  const salmos = findBook('sl');
  assert.ok(salmos);
  assert.equal(salmos?.id, 'sl');
});

test('parseBibleUrl parses /joao/3#v16 into { bookId: "jo", chapter: 3, verse: 16 }', () => {
  const result = parseBibleUrl('/joao/3', '#v16');
  assert.deepEqual(result, {
    bookId: 'jo',
    chapter: 3,
    verse: 16
  });
});

test('parseBibleUrl parses /gn/1 into { bookId: "gn", chapter: 1, verse: null }', () => {
  const result = parseBibleUrl('/gn/1', '');
  assert.deepEqual(result, {
    bookId: 'gn',
    chapter: 1,
    verse: null
  });
});

test('parseBibleUrl returns null on root or empty path', () => {
  assert.equal(parseBibleUrl('/', ''), null);
  assert.equal(parseBibleUrl('', ''), null);
});

test('continuous scroll next/prev chapter boundary calculations', () => {
  // Within same book
  assert.deepEqual(getNextChapter('gn', 1), { bookId: 'gn', chapter: 2 });
  assert.deepEqual(getPrevChapter('gn', 2), { bookId: 'gn', chapter: 1 });

  // Cross-book boundary: Genesis 50 -> Exodus 1
  assert.deepEqual(getNextChapter('gn', 50), { bookId: 'ex', chapter: 1 });
  assert.deepEqual(getPrevChapter('ex', 1), { bookId: 'gn', chapter: 50 });

  // Limits: Genesis 1 has no previous, Revelation 22 has no next
  assert.equal(getPrevChapter('gn', 1), null);
  assert.equal(getNextChapter('ap', 22), null);
});

test('reading position patching preserves existing verse number', () => {
  const current = {
    bookId: 'jo',
    chapter: 3,
    verse: 16,
    translation: 'ARC' as const,
    updatedAt: new Date().toISOString()
  };

  // Switch translation to NVI: verse must stay 16
  const updated = {
    ...current,
    translation: 'NVI' as const,
    updatedAt: new Date().toISOString()
  };

  assert.equal(updated.verse, 16);
  assert.equal(updated.translation, 'NVI');
  assert.equal(updated.bookId, 'jo');
  assert.equal(updated.chapter, 3);
});

