describe('AdministrationServices', function() {
  beforeEach(module('htm.administration'));

  describe('roundRobin', function() {
    it('should create no pairings for 0 people', inject(function(roundRobin) {
      expect(roundRobin(0)).toEqual([]);
    }));
    it('should create no pairings for 1 person', inject(function(roundRobin) {
      expect(roundRobin(1)).toEqual([]);
    }));
    it('should create a pairing for 2 people', inject(function(roundRobin) {
      expect(roundRobin(2)).toEqual([
        [1, 2]
      ]);
    }));
    it('should create pairings for 3 people', inject(function(roundRobin) {
      expect(roundRobin(3)).toEqual([
        [2, 3], [1, 3], [1, 2]
      ]);
    }));
    it('should create pairings for 4 people', inject(function(roundRobin) {
      expect(roundRobin(4)).toEqual([
        [1, 4], [2, 3],
        [1, 3], [4, 2],
        [1, 2], [3, 4]
      ]);
    }));
    it('should create pairings for 5 people', inject(function(roundRobin) {
      expect(roundRobin(5)).toEqual([
        [2, 5], [3, 4],
        [1, 5], [2, 3],
        [1, 4], [5, 3],
        [4, 2], [1, 3],
        [4, 5], [1, 2]
      ]);
    }));
    it('should give everyone the same number of fights', inject(function(roundRobin) {
      var everyone = _(roundRobin(50)).flatten();
      _(_(everyone).countBy(_.identity)).values().forEach(function(count) {
        // with 50 fighters everyone fights 49 times
        expect(count).toBe(49);
      });
    }));
  });
});